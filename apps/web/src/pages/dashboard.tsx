import { NextPage } from 'next';

import ArrowLeftRightIcon from 'assets/arrow-left-right.svg';
import { useState } from 'react';

enum Tab {
  Buyer = 0,
  Seller = 1
}

const Dashboard: NextPage = () => {
  const [tabId, setTabId] = useState<Tab>(Tab.Buyer);

  return (
    <div className="flex flex-col gap-6">
      <h2>Exchange Status</h2>
      <div className="flex flex-col gap-5">
        <div className="flex">
          <button onClick={() => setTabId(Tab.Buyer)}>Buyer</button>
          <button onClick={() => setTabId(Tab.Seller)}>Seller</button>
        </div>
        <div className="flex flex-col gap-6 rounded-[20px] bg-[#1F212C] py-5 px-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <h3>Order ID #1</h3>
              <span>Created on 2023/04/23 14:45:52</span>
            </div>
            <div className="gap-3` flex items-center">
              <span>Transaction Canceled</span>
              <button>Get a collateral</button>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="flex w-full flex-col gap-3">
              <span>Amount</span>
              <div className="flex items-center justify-between bg-white bg-opacity-10 py-4 px-5">
                <div className="flex gap-2">
                  <div>token img</div>
                  <span>|</span>
                  <div>On Ethereum</div>
                </div>
                <div>300</div>
              </div>
            </div>
            <div className="flex h-[70px] items-center justify-center">
              <ArrowLeftRightIcon />
            </div>

            <div className="flex w-full flex-col gap-3">
              <span>You Buy</span>
              <div className="flex items-center justify-between bg-white bg-opacity-10 py-4 px-5">
                <div className="flex gap-2">
                  <div>token img</div>
                  <span>|</span>
                  <div>On Ethereum</div>
                </div>
                <div>300</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
