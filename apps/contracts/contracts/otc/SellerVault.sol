// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./types.sol";
import "../interfaces/IMailbox.sol";
import "../interfaces/IInterchainGasPaymaster.sol";

contract SellerVault is Types {
    using SafeERC20 for IERC20;

    address constant coinAddr = address(0);
    address public orderFactoryAddr;
    uint256 public chainId;
    address public owner;
    IERC20 public collateral;

    uint256 public time_lock_span = 600;

    mapping(address => uint256) public user_nonce;
    mapping(address => mapping(uint256 => Order)) public order_db;
    mapping(uint32 => address) public oracleFactorys;
    uint32[] public chainIds;

    event ListSell(bytes32 tradeID, address seller, uint256 chainId, uint256 nonce, Order order, Sig sig, bytes32 mailID);
    event ResolveSell(address seller, uint256 nonce, uint256 chainId, Order order, Sig sig, bytes32 mailID);
    event HyperlaneRelay(bytes32 mailID);

    constructor(uint256 _chainId, address _orderFactoryAddr) {
        chainId = _chainId;
        orderFactoryAddr = _orderFactoryAddr;
        owner = msg.sender;
    }
    
    function setOwner(address _owner) external {
        require(owner == msg.sender, "err: not Owner");
        owner = _owner;
    }

    function setOracleFactorys(uint32[] memory chainIdList, address[] memory oracleFactoryList) external {
        require(owner == msg.sender, "err: not Owner");
        for(uint256 i=0; i<chainIdList.length; i++){
            oracleFactorys[chainIdList[i]] = oracleFactoryList[i];
        }
    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function encodeParameters(
        Order memory _order,
        uint256 _chainId,
        uint256 _nonce,
        Sig memory _sig,
        uint256 action
    ) internal view returns (bytes memory){
        return abi.encode(_order, _chainId, _nonce, _sig, action);
    }

    function _callMailBox(bytes memory parameterBytes) internal returns (bytes32) {
        uint32 polygonDomain = 80001;
        address mailBox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
        address paymaster = 0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a;
        
        bytes32 mailID = IMailbox(mailBox).dispatch(
            polygonDomain,
            addressToBytes32(orderFactoryAddr),
            parameterBytes
        );
        
        IInterchainGasPaymaster(paymaster).payForGas{value: 0.2 ether}(mailID, polygonDomain, 900000, msg.sender);
        return mailID;
    }

    // total Gas Fee: 0.3
    // function _callMailBox(bytes memory parameterBytes) internal {
    //     address mailBox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    //     address paymaster = 0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a;
    //     for(uint256 i=0; i<chainIdList.length; i++){
    //         uint32 domain = chainIdList[i];
    //         address oracleFactory =  oracleFactorys[domain];
    //         bytes32 mailID = IMailbox(mailBox).dispatch(
    //             domain,
    //             addressToBytes32(oracleFactory),
    //             parameterBytes
    //         );
    //         IInterchainGasPaymaster(paymaster).payForGas{value: 0.1 ether}(mailID, polygonDomain, 900000, msg.sender);
    //     }
    // }

    function list_sell(Order memory _order, Sig memory sig) external payable {
        address sender = msg.sender;

        if(_order.collateral_token == coinAddr){
            require(msg.value == _order.collateral_amount, "lack of collateral amount");
        }else{
            IERC20(_order.collateral_token).transferFrom(sender, address(this), _order.collateral_amount);
        }

        uint256 _nonce = _insert_order(sender, _order);
        require(sender == order_recover(_order, chainId, _nonce, sig), "list_sig");
        bytes32 tradeID = keccak256(abi.encode(_order.to, _nonce));

        // call to OrderFacotry Contract through hyperlane
        _order.time_lock_start = 0;
        bytes memory parameterBytes = encodeParameters(_order, chainId, _nonce, sig, 0);
        bytes32 mailID = _callMailBox(parameterBytes);

        _order.time_lock_start = block.timestamp;
        emit ListSell(tradeID, sender, chainId, _nonce, _order, sig, mailID);
    }

    function resolve_sell(uint256 _nonce, Sig memory sig, address _to) external payable {
        address sender = msg.sender;
        Order memory _order = order_db[sender][_nonce];
        require(block.timestamp <= _order.time_lock_start+time_lock_span, "resolve_sell: time lock");

        uint256 tmp = _order.time_lock_start;
        _order.time_lock_start = 0;
        address to;

        if(sender == order_recover(_order, _nonce, chainId, sig)){
            if(_order.to == address(0)){
                to = _to;
            }else {
                to = _order.to;
            }
        }
        
        if(_order.sell_token == coinAddr){
            require(msg.value >= _order.sell_amount, "lack of sell amount");
            payable(to).transfer(_order.sell_amount);
        }else {
            IERC20(_order.sell_token).transferFrom(sender, to, _order.sell_amount);
        }

        if(_order.collateral_token == coinAddr) {
            payable(sender).transfer(_order.collateral_amount);
        }else{
            IERC20(_order.collateral_token).transfer(sender, _order.collateral_amount);
        }

        // tmp = _order.time_lock_start;
        // _order.time_lock_start = 0;
        
        require(sender == order_recover(_order, _nonce, chainId, sig), "sell_sig");
        
        bytes memory parameterBytes = encodeParameters(_order, chainId, _nonce, sig, 1);
        bytes32 mailID = _callMailBox(parameterBytes);

        _order.time_lock_start = tmp;
        _order.to = to;
        emit ResolveSell(sender, _nonce, chainId, _order, sig, mailID);
    }

    function delete_sell(address orderer, uint256 _nonce) external {
        Order memory _order = order_db[orderer][_nonce];
        require(_order.time_lock_start+time_lock_span < block.timestamp, "delete_sell: time lock");
        _delete_order(orderer, _nonce);
    }

    function _insert_order(address orderer, Order memory _order) internal returns (uint256 _nonce) {
        _nonce = ++user_nonce[orderer];
        order_db[orderer][_nonce] = _order;
        order_db[orderer][_nonce].time_lock_start = block.timestamp;
    }
    function _delete_order(address orderer, uint256 _nonce) internal {
        delete order_db[orderer][_nonce];
    }
}