/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PrimaryButton from 'components/PrimaryButton';
import TokenIcon from 'components/TokenIcon';
import TokenInput from 'components/TokenInput';
import TokenSelect from 'components/TokenSelect';
import { chainIdEnumToChainName } from 'constants/chain';
import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContractType, IContract, getContractsByChainID } from 'omz-module';
import { useEffect, useRef, useState } from 'react';
import { shortenAddress } from 'utils/addresss';
import { useAccount, useNetwork, useBalance, useSwitchNetwork } from 'wagmi';
import ChevronDownBoldIcon from 'assets/chevron-down-bold.svg';
import CheckIcon from 'assets/check.svg';
import { twMerge } from 'tailwind-merge';

const Sell: NextPage = () => {
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { data: balance } = useBalance({ address, chainId: activeChain?.id });

  const chainSelectButtonRef = useRef<HTMLButtonElement>(null);

  const [isOpenChainSelect, setIsOpenChainSelect] = useState(false);

  const tokenContracts: IContract[] = activeChain
    ? getContractsByChainID(activeChain.id) ?? []
    : [];

  const amountOrDepositTokens = tokenContracts.filter(
    (token) => token.type === ContractType.NATIVE_COIN
  );

  const [amountToken, setAmountToken] = useState<IContract | undefined>();
  const [collateralToken, setCollateralToken] = useState<IContract | undefined>();

  const onSelectAmountToken = (token: IContract) => setAmountToken(token);
  const onSelectCollateralToken = (token: IContract) => setCollateralToken(token);

  const router = useRouter();

  useEffect(() => {
    if (tokenContracts.length > 0) {
      setAmountToken(tokenContracts[0]);
      setCollateralToken(tokenContracts[0]);
    }
  }, [tokenContracts.length, activeChain?.id]);

  useEffect(() => {
    const chainSelectCloseHandler = (e) => {
      if (chainSelectButtonRef.current && !chainSelectButtonRef.current.contains(e.target)) {
        setIsOpenChainSelect(false);
      }
    };

    window.addEventListener('click', chainSelectCloseHandler);

    return () => window.removeEventListener('click', chainSelectCloseHandler);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full max-h-[600px] w-full max-w-[500px] flex-col gap-3 rounded-[20px] bg-[#1F212C] py-11 px-9">
        <h2 className="mb-3 text-[28px] font-semibold leading-[33px]">Listing</h2>
        <div className="flex items-center justify-between">
          {activeChain && (
            <button
              className="bg-white/10 relative flex items-center gap-2 rounded-full py-1 px-2 text-[15px] leading-[17px]"
              onClick={() => setIsOpenChainSelect(true)}
              ref={chainSelectButtonRef}>
              <span>{chainIdEnumToChainName[activeChain.id]}</span>
              <div className="text-tint-blue">
                <ChevronDownBoldIcon />
              </div>
              <div
                className={twMerge(
                  'absolute bottom-0 right-0 hidden w-[194px] translate-y-full rounded-lg pt-2',
                  isOpenChainSelect && 'block'
                )}>
                {chains.map((chain, index) => (
                  <button
                    key={chain.id}
                    className={twMerge(
                      'bg-white flex w-full items-center justify-between p-2.5 text-[13px] leading-[16px] text-grey-5',
                      index === 0
                        ? 'rounded-t-lg'
                        : index === chains.length - 1
                        ? 'rounded-b-lg'
                        : '',
                      chain.id === activeChain.id && 'text-tint-blue'
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      switchNetwork?.(chain.id);
                      setIsOpenChainSelect(false);
                    }}>
                    <span>{chainIdEnumToChainName[chain.id]}</span>
                    {chain.id === activeChain.id && <CheckIcon />}
                  </button>
                ))}
              </div>
            </button>
          )}
          <span className="text-sm leading-[17px] text-grey-2">
            {address && shortenAddress(address, 10)}
          </span>
        </div>
        <hr className="text-white/10" />
        <div className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[15px] text-grey-4">Amount</label>
            </div>
            <TokenInput
              placeholder={
                balance?.value
                  ? parseFloat(ethers.utils.formatEther(balance?.value)).toFixed(4).toString()
                  : '0'
              }>
              {amountToken && (
                <TokenSelect
                  tokens={amountOrDepositTokens}
                  selectedToken={amountToken}
                  onSelectToken={onSelectAmountToken}
                />
              )}
            </TokenInput>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-grey-4">Price</label>
            <TokenInput placeholder="0">
              <div className="h-6 w-6 flex-shrink-0">
                <TokenIcon symbol="USDC" />
              </div>
            </TokenInput>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[15px] text-grey-4">Collateral</label>
            <TokenInput placeholder="0">
              {collateralToken && (
                <TokenSelect
                  tokens={amountOrDepositTokens}
                  selectedToken={collateralToken}
                  onSelectToken={onSelectCollateralToken}
                />
              )}
            </TokenInput>
          </div>
        </div>
        <PrimaryButton onClick={() => router.push('/sell-complete')}>Create an order</PrimaryButton>
      </div>
    </div>
  );
};

export default Sell;
