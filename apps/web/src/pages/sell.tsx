import PrimaryButton from 'components/PrimaryButton';
import TokenInput from 'components/TokenInput';
import TokenSelect from 'components/TokenSelect';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Token } from 'types';
import { useAccount } from 'wagmi';

const Sell: NextPage = () => {
  const { address } = useAccount();

  const tokens = [
    { address: '0x0', symbol: 'ETH' },
    { address: '0x0', symbol: 'ETH' }
  ];

  const [amountToken, setAmountToken] = useState<Token>(tokens[0]);
  const [collateralToken, setCollateralToken] = useState<Token>(tokens[0]);

  const onSelectAmountToken = (token: Token) => setAmountToken(token);
  const onSelectCollateralToken = (token: Token) => setCollateralToken(token);

  const router = useRouter();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full max-h-[600px] w-full max-w-[500px] flex-col gap-3 rounded-[20px] bg-[#1F212C] py-11 px-9 ">
        <span>Listing</span>
        <div className="flex items-center justify-between">
          <span>Wallet address</span>
          <span>{address}</span>
        </div>
        <hr />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label>Amount</label>
            <TokenInput>
              <TokenSelect
                tokens={tokens}
                selectedToken={amountToken}
                onSelectToken={onSelectAmountToken}
              />
            </TokenInput>
          </div>
          <div className="flex flex-col gap-3">
            <label>Price</label>
            <TokenInput />
          </div>
          <div className="flex flex-col gap-3">
            <label>Collateral</label>
            <TokenInput>
              <TokenSelect
                tokens={tokens}
                selectedToken={collateralToken}
                onSelectToken={onSelectCollateralToken}
              />
            </TokenInput>
          </div>
        </div>
        <PrimaryButton onClick={() => router.push('/sell-complete')}>Create an order</PrimaryButton>
      </div>
    </div>
  );
};

export default Sell;
