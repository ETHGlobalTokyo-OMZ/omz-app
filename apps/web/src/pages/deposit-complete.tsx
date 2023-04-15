import PrimaryButton from 'components/PrimaryButton';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const DepositComplete: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-[28px] font-semibold leading-[142.34%]">Deposit completed!</h2>
        <PrimaryButton
          className="w-full max-w-[428px]"
          onClick={() => router.push('/dashboard?tab=seller')}>
          Back to dashboard
        </PrimaryButton>
      </div>
    </div>
  );
};

export default DepositComplete;
