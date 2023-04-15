import { ChainIDEnums } from 'omz-module';

export const chainIdEnumToChainName: { [key in ChainIDEnums]: string } = {
  [ChainIDEnums.GOERLI]: 'Ethererum',
  [ChainIDEnums.MUMBAI]: 'Polygon'
};
