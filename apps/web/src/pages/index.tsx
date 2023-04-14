/* eslint-disable react/button-has-type */
import type { NextPage } from 'next';
import useCounter from 'hooks/useCounter';
import dynamic from 'next/dynamic';

const ConnectButton = dynamic(() => import('../components/Button/ConnectButton'), {
  ssr: false
});

const Home: NextPage = () => {
  const { count, incrementCount } = useCounter();
  return (
    <>
      <h1>Count</h1>
      <div>{count}</div>
      <button onClick={incrementCount}>Increment</button>
      <ConnectButton />
    </>
  );
};

export default Home;
