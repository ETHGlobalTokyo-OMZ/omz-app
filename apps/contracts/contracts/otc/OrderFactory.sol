// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./types.sol";
import "./Escrow.sol";

contract OrderFactory is Types {
    using SafeERC20 for IERC20;

    IERC20 public collateral;
    uint256 public time_lock_span = 600;
    address constant mailbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    address public owner;

    mapping(address => bool) public eventAccess;
    

    modifier onlyMailbox() {
        require(msg.sender == mailbox);
        _;    
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _body
    ) external onlyMailbox {
        (
        Order memory _order,
        uint256 _chainId, 
        uint256 _nonce,
        Sig memory _sig,
        uint256 action
        ) = abi.decode(_body, (Order, uint256, uint256, Sig, uint256));
        
        if(action == 0){
            create_escrow(_order, _chainId, _nonce, _sig);
        }else if(action == 1){
            resolve_escrow(_order, _chainId, _nonce, _sig);
        }
    }

    // eoa => chainid => nonce
    mapping(address => mapping(uint256 => mapping(uint256 => address))) public escrows;

    event Escrow_Create(bytes32 tradeID, address escrow, uint256 chainId, uint256 nonce, Order order);
    event EscrowDeposit(address escrowAddr, address orderer, address tokenAddr, uint256 amount);

    constructor(IERC20 zkBoB) {
        collateral = zkBoB;
        owner = msg.sender;
    }

    function escrowDeposit(address orderer, address tokenAddr, uint256 amount) external {
        require(eventAccess[msg.sender], "Only Escrow contracts");
        emit EscrowDeposit(msg.sender, orderer, tokenAddr, amount);
    }

    function set_time_lock_span(uint256 _time_lock_span) external {
        require(owner == msg.sender, "only Owner");
        time_lock_span = _time_lock_span;
    }

    function setOwner(address _owner) external {
        require(owner == msg.sender, "only Owner");
        owner = _owner;
    }

    function create_escrow(Order memory _order, uint256 _chainId, uint256 _nonce, Sig memory _sig) public {
        uint256 blockTimeStamp = _order.time_lock_start;
        _order.time_lock_start = 0;

        address seller = order_recover(_order, _chainId, _nonce, _sig);

        IEscrow _escrow = IEscrow( address(new Escrow{salt: keccak256(abi.encode(_order, _chainId, _nonce, _sig))}()) );
        escrows[seller][_chainId][_nonce] = address(_escrow);
        eventAccess[address(_escrow)] = true;

        _escrow.init(seller, _order.bob_amount, address(this), address(collateral));
        bytes32 tradeID = keccak256(abi.encode(_order.to, _nonce));
        
        _order.time_lock_start = blockTimeStamp;
        emit Escrow_Create(tradeID, address(_escrow), _chainId, _nonce, _order);
    }

    function resolve_escrow(Order memory _order, uint256 _chainId, uint256 _nonce, Sig memory _sig) public {
        address seller = order_recover(_order, _nonce, _chainId, _sig);
        IEscrow _escrow = IEscrow( escrows[seller][_chainId][_nonce] );
        _escrow.resolve(collateral);
    }

    function terminate_escrow(address seller, uint256 _chainId, uint256 _nonce) external {
        IEscrow _escrow = IEscrow( escrows[seller][_chainId][_nonce] );
        _escrow.terminate(time_lock_span, collateral, msg.sender);
    }
}