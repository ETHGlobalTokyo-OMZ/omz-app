/* eslint-disable no-underscore-dangle */
import PrimaryButton from 'components/PrimaryButton';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import TokenIcon from 'components/TokenIcon';

import ChevronLeftIcon from 'assets/chevron-left.svg';
import { useQuery } from 'react-query';
import { getListing } from 'queries/market-list';
import { useAccount, useBalance } from 'wagmi';
import { ethers } from 'ethers';

const Deposit: NextPage = () => {
  const router = useRouter();

  const { address } = useAccount();

  const { data: listing } = useQuery(['getListing'], () =>
    getListing(router.query._id?.toString() ?? '')
  );

  const { data: balance } = useBalance({ address, chainId: listing?.chainID });

  const canDeposit = balance?.value.gte(
    ethers.utils.parseUnits(listing ? listing.sellTokenAmount.toString() : '0', balance.decimals)
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <button
        className="absolute left-0 top-0 flex items-center gap-1"
        onClick={() => router.push('/dashboard?tab=seller')}>
        <ChevronLeftIcon />
        <span className="text-xl font-semibold leading-[30px]">Back</span>
      </button>

      {router.query._id && listing && (
        <div className="flex w-full items-center justify-center">
          <div className="flex w-full max-w-[500px] flex-col gap-6 rounded-[20px] bg-[#1F212C] py-11 px-9 ">
            <h2 className="text-[28px] font-semibold leading-[42px]">Deposit</h2>
            <div className="flex items-end justify-between gap-2.5">
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] leading-[18px] text-grey-2">Amount to Sell</span>

                  <div className="flex items-center gap-1 text-xs text-grey-4">
                    <span>Available</span>
                    <span className="text-grey-2">
                      {balance?.value
                        ? parseFloat(ethers.utils.formatEther(balance?.value)).toFixed(4).toString()
                        : '0'}
                    </span>
                  </div>
                </div>
                <div className="bg-white flex items-center gap-3 rounded-[10px] bg-opacity-10 p-4">
                  <div className="h-6 w-6">
                    <TokenIcon symbol={listing.sellTokenName} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] text-grey-1">{`${listing.sellTokenAmount} ${listing.sellTokenName}`}</span>
                  </div>
                </div>
              </div>
            </div>

            <PrimaryButton onClick={() => router.push('/deposit-complete')} disabled={!canDeposit}>
              Deposit token to sell
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
