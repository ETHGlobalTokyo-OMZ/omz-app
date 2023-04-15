import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {

  let contracts: {[key: string]: string} = {}
  
  const ERC20 = await ethers.getContractFactory("ERC20Custom");  
  const OrderFactory = await ethers.getContractFactory("OrderFactory");

  const bob = await ERC20.deploy("BOB", "BOB", 18);
  await bob.deployed();

  const orderFactory = await OrderFactory.deploy(bob.address);
  await orderFactory.deployed();

  console.log("bob: " + bob.address);
  console.log("orderFactory: " + orderFactory.address);

  contracts['Bob'] = bob.address;
  contracts['OrderFactory'] = orderFactory.address;

  let json = JSON.stringify(contracts);
  fs.writeFileSync('contracts.json', json);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main();
