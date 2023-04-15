// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./types.sol";

contract SellerVault is Types {
    using SafeERC20 for IERC20;

    address constant coinAddr = address(0);

    address public orderFactoryAddr;
    uint256 public chainId;
    IERC20 public collateral;

    uint256 public time_lock_span = 600;

    mapping(address => uint256) public user_nonce;
    mapping(address => mapping(uint256 => Order)) public order_db;

    event ListSell(bytes32 tradeID, address seller, uint256 chainId, uint256 nonce, Order order, Sig sig);
    event ResolveSell(address seller, uint256 nonce, uint256 chainId, Order order, Sig sig);

    constructor(uint256 _chainId, address _orderFactoryAddr) {
        chainId = _chainId;
        orderFactoryAddr = _orderFactoryAddr;
    }

    function list_sell(Order memory _order, Sig memory sig) external payable {
        address sender = msg.sender;

        if(_order.collateral_token == coinAddr){
            require(msg.value == _order.collateral_amount, "lack of collateral amount");
        }else{
            IERC20(_order.collateral_token).transferFrom(sender, address(this), _order.collateral_amount);
        }

        uint256 _nonce = _insert_order(sender, _order);
        require(sender == order_recover(_order, chainId, _nonce, sig), "list_sig");

        _order.time_lock_start = block.timestamp;
        bytes32 tradeID = keccak256(abi.encode(_order.to, _nonce));
        emit ListSell(tradeID, sender, chainId, _nonce, _order, sig);

    }

    function resolve_sell(uint256 _nonce, Sig memory sig) external payable {
        address sender = msg.sender;
        Order memory _order = order_db[sender][_nonce];
        require(block.timestamp <= _order.time_lock_start+time_lock_span, "resolve_sell: time lock");

        if(_order.sell_token == coinAddr){
            require(msg.value == _order.sell_amount, "lack of sell amount");
            payable(_order.to).transfer(_order.sell_amount);
        }else {
            IERC20(_order.sell_token).transferFrom(sender, _order.to, _order.sell_amount);
        }

        if(_order.collateral_token == coinAddr) {
            payable(sender).transfer(_order.collateral_amount);
        }else{
            IERC20(_order.collateral_token).transfer(sender, _order.collateral_amount);
        }

        uint256 tmp = _order.time_lock_start;
        _order.time_lock_start = 0;
        require(sender == order_recover(_order, _nonce, chainId, sig), "sell_sig");
        _order.time_lock_start = tmp;

        emit ResolveSell(sender, chainId, _nonce, _order, sig);
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