interface IOrderFactory {
    function escrowDeposit(address orderer, address tokenAddr, uint256 amount) external;
}