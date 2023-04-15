// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./types.sol";

interface IEscrow {
    function init(address _orderer, uint256 _amount) external;
    function resolve(IERC20 zkBOB) external;
    function terminate(uint256 lock_span, IERC20 zkBOB, address to) external;
}

contract Escrow is Types, Ownable {
    using SafeERC20 for IERC20;

    address public orderer;
    uint256 public amount;
    uint256 public time_lock_start;

    function init(address _orderer, uint256 _amount) onlyOwner external {
        orderer = _orderer;
        amount = _amount;
        time_lock_start = block.timestamp;
    }
}