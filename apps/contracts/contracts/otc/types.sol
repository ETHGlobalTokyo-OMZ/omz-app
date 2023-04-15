// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

contract Types {
    struct Order {
        address to;
        address sell_token;
        uint256 sell_amount;
        address buy_token;
        uint256 buy_amount;
        address collateral_token;
        uint256 collateral_amount;
        uint256 time_lock_start;
    }

    function get_order_hash(
        Order memory _order,
        uint256 a,
        uint256 b
    ) public pure returns (bytes32) {
        return keccak256(abi.encode(_order, a, b));
    }
}
