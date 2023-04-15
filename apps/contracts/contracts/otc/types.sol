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

    function _getMessageHash(bytes32 _message) internal pure returns (bytes32) {
        return keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _message
                )
            );
    }

    function order_recover(
        Order memory _order,
        uint256 _chainId_or_nonce,
        uint256 _nonce_or_chainId,
        Sig memory sig
    ) public pure returns (address recover_addr) {
        bytes32 message = _getMessageHash(get_order_hash(_order, _chainId_or_nonce, _nonce_or_chainId));
        recover_addr = ecrecover(message, sig.v, sig.r, sig.s);
    }

    function get_order_hash(Order memory _order, uint256 a, uint256 b) public pure returns(bytes32) {
        return keccak256(abi.encode(_order, a, b));
    }
}