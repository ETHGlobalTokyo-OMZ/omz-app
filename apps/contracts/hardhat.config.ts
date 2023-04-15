import { HardhatUserConfig } from "hardhat/config";
import {node_url, accounts} from './utils/network';
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-tracer";


const config: HardhatUserConfig = {
  solidity: "0.8.1",
  solidity: {
    compilers: [
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
      {
        version: "0.6.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {},
    localhost: {
      url: node_url('localhost'),
      chainId: 31337
    },
    polygonTestnet:{
      url: node_url('polygonTestnet'),
      accounts: accounts('polygonTestnet'),
      chainId: 80001,
      gas: 8000000,
      timeout: 10000000000
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
      chainId: 5,
      gas: 7000000
    },
    optimism: {
      url: node_url('optimism'),
      accounts: accounts('optimism'),
      chainId: 420,
      gas: 8000000
    }
  },
  mocha: {
    timeout: 100000000
  }
};

export default config;
