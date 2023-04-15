import {expect} from './chai-setup';
import {ethers} from 'hardhat';
import {Custom_ERC20, SellerVault, OrderFactory} from '../typechain-types';
import * as fs from "fs";
import Web3 from "web3"
import { ContractFactory, ContractTransaction } from '@ethersproject/contracts';

const accountsFile: string = fs.readFileSync('./contracts.json', 'utf8');
const accounts: any = JSON.parse(accountsFile);
const signerKey = fs.readFileSync('./signerKey', 'utf-8');

async function setup() {
  const Custom_ERC20: ContractFactory = await ethers.getContractFactory("Custom_ERC20");
  const SellerVault: ContractFactory = await ethers.getContractFactory("SellerVault");
  const OrderFactory: ContractFactory = await ethers.getContractFactory("OrderFactory");

  // contract list
  const contracts = {
    USDC: <Custom_ERC20> await Custom_ERC20.attach(accounts.Usdc),
    BOB: <Custom_ERC20> await Custom_ERC20.attach(accounts.Bob),
    SellerVault: <SellerVault> await SellerVault.attach(accounts.SellerVault),
    OrderFactory: <OrderFactory> await OrderFactory.attach(accounts.OrderFactory)
  };

  return {
    contracts
  };
}

describe('SellerVault', async function () {
  let usdc: Custom_ERC20;
  let bob: Custom_ERC20;
  let sellerVault: SellerVault;
  let orderFactory: OrderFactory;
  let web3: Web3;
  let users: any;

  const nonce = 1;
  let order;

  beforeEach(async function () {
    let {contracts} = await setup();
    users = await ethers.getSigners();
    usdc = contracts.USDC;
    bob = contracts.BOB;
    sellerVault = contracts.SellerVault;
    orderFactory = contracts.OrderFactory;
    web3 = new Web3();
  });

  it("[resolve_escrow - Buyer]", async function() {
    const buyer_stealth: string = users[0].address;
    const coinAddr = "0x0000000000000000000000000000000000000000";
    const bob_amount= (10**18).toString();
    const eth_amount = (10**15).toString();
    const collateral_amount = (100 * 10 ** 6).toString();
    const chain_id = 0;

    let order = {
      to: buyer_stealth,
      bob_amount: bob_amount,
      sell_token: coinAddr,
      sell_amount: eth_amount,
      collateral_token: usdc.address,
      collateral_amount: collateral_amount,
      time_lock_start: 0
    };

    let list_hash = await sellerVault.get_order_hash(order, chain_id, nonce);
    console.log("list_Hash: " + list_hash);

    let resolve_hash = await sellerVault.get_order_hash(order, nonce, chain_id);
    let resolve_sig = await web3.eth.accounts.sign(resolve_hash, signerKey);
    
    let resolveSig = {
      v: resolve_sig.v,
      r: resolve_sig.r,
      s: resolve_sig.s
    }

    let escrowAddr: string = await orderFactory.escrows(users[0].address, chain_id, nonce);
    console.log(escrowAddr);

    let tx = await bob.transfer(escrowAddr, bob_amount); 
    await tx.wait();
    console.log(tx);

    // tx = await orderFactory.resolve_escrow(order, chain_id, nonce, resolveSig);
    // await tx.wait();
    // console.log(tx);

  });

});
