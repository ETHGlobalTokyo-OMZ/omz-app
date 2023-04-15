/* eslint-disable no-underscore-dangle */
import PrimaryButton from 'components/PrimaryButton';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ArrowRightCircleIcon from 'assets/arrow-right-circle.svg';
import TokenIcon from 'components/TokenIcon';

import ChevronLeftIcon from 'assets/chevron-left.svg';
import { useAccount, useBalance, useNetwork, useQuery } from 'wagmi';
import { IContract, getContractsByChainID } from 'omz-module';
import { ethers } from 'ethers';
import { getListing } from 'queries/market-list';
import { chainIdEnumToChainName } from 'constants/chain';

const Order: NextPage = () => {
  const router = useRouter();

  const { data: listing } = useQuery(['getListing'], () =>
    getListing(router.query._id?.toString() ?? '')
  );

  const { chain: activeChain } = useNetwork();
  const { address } = useAccount();

  const tokenContracts: IContract[] = activeChain
    ? getContractsByChainID(activeChain.id) ?? []
    : [];
  const usdcContract = tokenContracts.find((tokenContract) => tokenContract.tokenName === 'USDC');

  const { data: availableUSDC } = useBalance({
    address,
    token: usdcContract?.address as `0x${string}`,
    chainId: activeChain?.id
  });

  const canOrder = availableUSDC?.value.gte(
    ethers.utils.parseUnits(listing?.tokenAmount ?? '0', 6)
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <button
        className="absolute left-0 top-0 flex items-center gap-1"
        onClick={() => router.push('/')}>
        <ChevronLeftIcon />
        <span className="text-xl font-semibold leading-[30px]">Back</span>
      </button>

      {listing && (
        <div className="flex w-full items-center justify-center">
          <div className="flex w-full max-w-[500px] flex-col gap-6 rounded-[20px] bg-[#1F212C] py-11 px-9 ">
            <h2 className="text-[28px] font-semibold leading-[42px]">
              Order <br /> Information
            </h2>
            <div className="flex items-end justify-between gap-2.5">
              <div className="flex w-full flex-col gap-3">
                <span>Amount</span>
                <div className="bg-white flex items-center gap-3 rounded-[10px] bg-opacity-10 py-2 px-4">
                  <div className="h-6 w-6">
                    <TokenIcon symbol="USDC" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm leading-[17px] text-grey-1">{listing.price}</span>
                    {availableUSDC?.value && (
                      <div className="flex items-center gap-1 text-xs text-grey-4">
                        <span>Available</span>
                        <span>|</span>
                        <span className="text-grey-2">
                          {ethers.utils.formatUnits(availableUSDC?.value, availableUSDC?.decimals)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-2.5">
                <ArrowRightCircleIcon />
              </div>

              <div className="flex w-full flex-col gap-3">
                <span>You Buy</span>
                <div className="bg-white flex items-center gap-3 rounded-[10px] bg-opacity-10 py-2 px-4">
                  <div className="h-6 w-6">
                    <TokenIcon symbol={listing.sellTokenName} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm leading-[17px] text-grey-1">{`${listing.sellTokenAmount} ${listing.sellTokenName}`}</span>
                    <div className="flex items-center gap-1 text-xs text-grey-4">{`On ${
                      chainIdEnumToChainName[listing.chainID]
                    }`}</div>
                  </div>
                </div>
              </div>
            </div>

            <PrimaryButton disabled={!canOrder} onClick={() => router.push('/order-complete')}>
              Make an order
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
