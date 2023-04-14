import PrimaryButton from 'components/PrimaryButton';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const SellComplete: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/sell')}>Back to listing</button>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2>Listing completed!</h2>
        <PrimaryButton>Go to dashboard</PrimaryButton>
      </div>
    </div>
  );
};

export default SellComplete;
