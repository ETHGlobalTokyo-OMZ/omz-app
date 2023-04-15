// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

contract Types {
    struct Order {
        address to;
        uint256 bob_amount;
        address sell_token;
        uint256 sell_amount;
        address collateral_token;
        uint256 collateral_amount;
        uint256 time_lock_start;
    }

    struct Sig {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }
}