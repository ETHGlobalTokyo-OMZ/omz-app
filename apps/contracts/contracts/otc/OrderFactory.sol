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
            uint256 action
        ) = abi.decode(_body, (Order, uint256, uint256, uint256));

        if (action == 0) {
            create_escrow(_order, _chainId, _nonce);
        } else if (action == 1) {
            resolve_escrow(_order, _chainId, _nonce);
        }
    }

    // eoa => chainid => nonce
    mapping(address => mapping(uint256 => mapping(uint256 => address)))
        public escrows;

    event Escrow_Create(
        bytes32 tradeID,
        address escrow,
        uint256 chainId,
        uint256 nonce,
        Order order
    );

    constructor(IERC20 zkBoB) {
        collateral = zkBoB;
    }

    function create_escrow(
        Order memory _order,
        uint256 _chainId,
        uint256 _nonce,
    ) public {
        uint256 blockTimeStamp = _order.time_lock_start;
        _order.time_lock_start = 0;

        address seller = order_recover(_order, _chainId, _nonce);

        IEscrow _escrow = IEscrow(
            address(
                new Escrow{
                    salt: keccak256(abi.encode(_order, _chainId, _nonce))
                }()
            )
        );
        escrows[seller][_chainId][_nonce] = address(_escrow);

        _escrow.init(seller, _order.bob_amount);
        bytes32 tradeID = keccak256(abi.encode(_order.to, _nonce));

        _order.time_lock_start = blockTimeStamp;
        emit Escrow_Create(tradeID, address(_escrow), _chainId, _nonce, _order);
    }

    function resolve_escrow(
        Order memory _order,
        uint256 _chainId,
        uint256 _nonce,
    ) public {
        address seller = order_recover(_order, _nonce, _chainId);
        IEscrow _escrow = IEscrow(escrows[seller][_chainId][_nonce]);
        _escrow.resolve(collateral);
    }

    function terminate_escrow(
        address seller,
        uint256 _chainId,
        uint256 _nonce
    ) external {
        IEscrow _escrow = IEscrow(escrows[seller][_chainId][_nonce]);
        _escrow.terminate(time_lock_span, collateral, msg.sender);
    }
}
