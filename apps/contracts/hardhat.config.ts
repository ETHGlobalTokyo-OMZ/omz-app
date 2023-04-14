import 'solidity-coverage';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import { HardhatUserConfig } from 'hardhat/types';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-etherscan';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
// proxy
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-contract-sizer';

dotenvConfig({ path: resolve(__dirname, './.env') });

const PRIVATE_KEY = process.env.PRIVATE_KEY || 'privatKey';
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    zkEVM: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
};

export default config;
