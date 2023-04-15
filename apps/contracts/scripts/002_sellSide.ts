import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {

  const jsonFile: string = fs.readFileSync('./contracts.json', 'utf8');
  let contracts: {[key: string]: string} = JSON.parse(jsonFile);

  const chainID = 0;
  const ERC20 = await ethers.getContractFactory("ERC20Custom");  
  const SellerVault = await ethers.getContractFactory("SellerVault");

  const usdc = await ERC20.deploy("USDC", "USDC", 6);
  await usdc.deployed();

  const sellerVault = await SellerVault.deploy(chainID, contracts.OrderFactory);
  await sellerVault.deployed();

  console.log("usdc: "+ usdc.address);
  console.log("sellerVault: "+ sellerVault.address);

  contracts['Usdc'] = usdc.address;
  contracts['SellerVault'] = sellerVault.address;

  let json = JSON.stringify(contracts);
  fs.writeFileSync('contracts.json', json);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main();
