import PrimaryButton from 'components/PrimaryButton';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ArrowLeftTornadoIcon from 'assets/arrow-left-tornado.svg';

const SellComplete: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <button
        className="absolute left-0 top-0 flex items-center gap-1"
        onClick={() => router.push('/sell')}>
        <ArrowLeftTornadoIcon />
        <span className="text-xl font-semibold leading-[30px]">Back to Listing</span>
      </button>
      <div className="g flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[28px] font-semibold leading-[142.34%]">Listing completed!</h2>
          <p className="text-center leading-[27px] text-grey-2">
            Deposit token within 24 hrs after buyer ordered. If not, collateral will be transfered
            to buyer. <br /> We'll send notificiation to help you meet the deadline.
          </p>
        </div>
        <PrimaryButton
          className="mt-[52px] w-full max-w-[428px]"
          onClick={() => router.push('/dashboard?tab=seller')}>
          Go to dashboard
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SellComplete;
