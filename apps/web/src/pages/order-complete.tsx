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
        <h2 className="text-[28px] font-semibold leading-[142.34%]">Order completed!</h2>
        <PrimaryButton
          className="w-full max-w-[428px]"
          onClick={() => router.push('/dashboard?tab=buyer')}>
          Go to dashboard
        </PrimaryButton>
      </div>
    </div>
  );
};

export default OrderComplete;
