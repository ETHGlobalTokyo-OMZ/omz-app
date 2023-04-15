import PrimaryButton from 'components/PrimaryButton';
import TokenIcon from 'components/TokenIcon';
import TokenInput from 'components/TokenInput';
import TokenSelect from 'components/TokenSelect';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Token } from 'types';
import { shortenAddress } from 'utils/addresss';
import { useAccount } from 'wagmi';

const Sell: NextPage = () => {
  const { address } = useAccount();

  const tokens = [
    { address: '0x0', symbol: 'ETH' },
    { address: '0x2', symbol: 'MATIC' }
  ];

  const [amountToken, setAmountToken] = useState<Token>(tokens[0]);
  const [collateralToken, setCollateralToken] = useState<Token>(tokens[0]);

  const onSelectAmountToken = (token: Token) => setAmountToken(token);
  const onSelectCollateralToken = (token: Token) => setCollateralToken(token);

  const router = useRouter();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full max-h-[600px] w-full max-w-[500px] flex-col gap-3 rounded-[20px] bg-[#1F212C] py-11 px-9">
        <h2 className="mb-3 text-[28px] font-semibold leading-[33px]">Listing</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm leading-[17px]">Wallet address</span>
          <span className="text-sm leading-[17px] text-grey-2">
            {address && shortenAddress(address, 10)}
          </span>
        </div>
        <hr className="text-white/10" />
        <div className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-grey-4">Amount</label>
            <TokenInput placeholder="0">
              <TokenSelect
                tokens={tokens}
                selectedToken={amountToken}
                onSelectToken={onSelectAmountToken}
              />
            </TokenInput>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-grey-4">Price</label>
            <TokenInput placeholder="0">
              <div className="flex-shrink-0">
                <TokenIcon symbol="USDC" />
              </div>
            </TokenInput>
          </div>
          <div className="flex flex-col gap-2">
            <label>Collateral</label>
            <TokenInput placeholder="0">
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
