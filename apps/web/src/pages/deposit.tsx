import PrimaryButton from 'components/PrimaryButton';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ArrowRightCircleIcon from 'assets/arrow-right-circle.svg';
import TokenIcon from 'components/TokenIcon';

import ChevronLeftIcon from 'assets/chevron-left.svg';

const Deposit: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <button
        className="absolute left-0 top-0 flex items-center gap-1"
        onClick={() => router.push('/dashboard')}>
        <ChevronLeftIcon />
        <span className="text-xl font-semibold leading-[30px]">Back</span>
      </button>

      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[500px] flex-col gap-6 rounded-[20px] bg-[#1F212C] py-11 px-9 ">
          <h2 className="text-[28px] font-semibold leading-[42px]">Deposit</h2>
          <div className="flex items-end justify-between gap-2.5">
            <div className="flex w-full flex-col gap-3">
              <span className="text-[15px] leading-[18px] text-grey-2">Amount to Sell</span>
              <div className="bg-white flex items-center gap-3 rounded-[10px] bg-opacity-10 py-2 px-4">
                <div className="h-6 w-6">
                  <TokenIcon symbol="ETH" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm leading-[17px] text-grey-1">5 ETH</span>
                  <div className="flex items-center gap-1 text-xs text-grey-4">
                    <span>Available</span>
                    <span>|</span>
                    <span className="text-grey-2">2300</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PrimaryButton onClick={() => router.push('/deposit-complete')}>
            Deposit token to sell
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
