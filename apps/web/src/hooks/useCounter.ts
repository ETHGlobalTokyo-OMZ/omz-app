import { useCallback, useEffect, useState } from 'react';

import { useContract, useSigner } from 'wagmi';

import Counter from '../abi/counter.json';

const counterAddress = '0xAEe95a8d62b1b2fa91a67C46875408e0bbf765Cc';

const useCounter = () => {
  const [count, setCount] = useState<number>(0);

  const { data: signer } = useSigner();

  const contract = useContract({
    address: counterAddress,
    abi: Counter,
    signerOrProvider: signer
  });

  const readCounterValue = useCallback(async () => {
    if (contract) {
      const data = await contract.retrieve();
      setCount(parseInt(data.toString(), 10));
    }
  }, [contract]);

  useEffect(() => {
    // declare the data fetching function
    const fetchCount = async () => {
      const data = await readCounterValue();
      return data;
    };

    fetchCount().catch(console.error);
  }, [readCounterValue]);

  const incrementCount = async () => {
    if (contract) {
      const transaction = await contract.increment();
      await transaction.wait();
      readCounterValue();
    }
  };

  return { count, incrementCount };
};

export default useCounter;
