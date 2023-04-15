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

    // eoa => chainid => nonce
    mapping(address => mapping(uint256 => mapping(uint256 => address))) public escrows;

    event Escrow_Create(bytes32 tradeID, address escrow, uint256 chainId, uint256 nonce, Order order);

    constructor(IERC20 zkBoB) {
        collateral = zkBoB;
    }
}