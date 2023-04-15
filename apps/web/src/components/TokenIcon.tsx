import { FC, ReactNode } from 'react';

import ETH from 'assets/eth.svg';
import MATIC from 'assets/matic.svg';
import USDC from 'assets/usdc.svg';
import BOB from 'assets/bob.svg';

const symbolToIcon: Record<string, ReactNode | undefined> = {
  ETH: <ETH />,
  MATIC: <MATIC />,
  USDC: <USDC />,
  BOB: <BOB />
};

interface TokenIconProps {
  symbol: string;
}

const TokenIcon: FC<TokenIconProps> = ({ symbol }) => <>{symbolToIcon[symbol]}</>;

export default TokenIcon;
