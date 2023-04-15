"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    try {
        const CounterContractFactory = await hardhat_1.ethers.getContractFactory('Counter');
        const counterContract = await CounterContractFactory.deploy();
        await counterContract.deployed();
        console.log(`Counter contract deployed to https://explorer.public.zkevm-test.net/address/${counterContract.address}`);
    }
    catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}
main();
//# sourceMappingURL=deploy.js.map