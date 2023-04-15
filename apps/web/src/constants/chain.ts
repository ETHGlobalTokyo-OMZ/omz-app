import { ChainIDEnums } from 'omz-module';

export const chainIdEnumToChainName: Record<number, string> = {
  [ChainIDEnums.GOERLI]: 'Ethererum',
  [ChainIDEnums.MUMBAI]: 'Polygon'
};
