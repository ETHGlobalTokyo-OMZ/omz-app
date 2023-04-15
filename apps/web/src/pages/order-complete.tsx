import PrimaryButton from 'components/PrimaryButton';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ArrowLeftTornadoIcon from 'assets/arrow-left-tornado.svg';

const OrderComplete: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <button
        className="absolute left-0 top-0 flex items-center gap-1"
        onClick={() => router.push('/')}>
        <ArrowLeftTornadoIcon />
        <span className="text-xl font-semibold leading-[30px]">Back to OTC Market</span>
      </button>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[28px] font-semibold leading-[142.34%]">Order completed!</h2>
          <p className="text-center leading-[27px] text-grey-2">
            If seller doesn't transfer the token to you within 24 hrs, <br />
            you can claim the collateral on dashboard.
          </p>
        </div>
        <PrimaryButton
          className="mt-[52px] w-full max-w-[428px]"
          onClick={() => router.push('/dashboard?tab=buyer')}>
          Go to dashboard
        </PrimaryButton>
      </div>
    </div>
  );
};

export default OrderComplete;
