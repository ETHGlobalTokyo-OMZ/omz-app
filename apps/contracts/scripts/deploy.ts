import { ethers } from 'hardhat';

async function main() {
  try {
    const CounterContractFactory = await ethers.getContractFactory('Counter');
    const counterContract = await CounterContractFactory.deploy();

    await counterContract.deployed();

    console.log(
      `Counter contract deployed to https://explorer.public.zkevm-test.net/address/${counterContract.address}`,
    );
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
