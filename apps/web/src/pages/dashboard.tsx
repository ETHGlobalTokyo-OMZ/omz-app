/* eslint-disable react/button-has-type */
import { NextPage } from 'next';

import ArrowLeftRightIcon from 'assets/arrow-left-right.svg';
import DollarSignIcon from 'assets/dollar-sign.svg';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import TokenIcon from 'components/TokenIcon';

enum TabId {
  Buyer = 0,
  Seller = 1
}

const Dashboard: NextPage = () => {
  const [tabId, setTabId] = useState<TabId>(TabId.Buyer);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[28px] font-medium leading-[42px] opacity-80">Exchange Status</h2>
      <div className="flex flex-col gap-5">
        <div className="flex">
          <button
            className={twMerge(
              'flex w-[114px] items-center justify-center rounded-tl-[4px] border-b border-tint-blue bg-grey-9 py-1.5 leading-[24px] text-tint-blue',
              tabId === TabId.Buyer && 'text-white bg-tint-blue font-semibold'
            )}
            onClick={() => setTabId(TabId.Buyer)}>
            Buyer
          </button>
          <button
            className={twMerge(
              'flex w-[114px] items-center justify-center rounded-tr-[4px] border-b border-tint-blue bg-grey-9 py-1.5 leading-[24px] text-tint-blue',
              tabId === TabId.Seller && 'text-white bg-tint-blue font-semibold'
            )}
            onClick={() => setTabId(TabId.Seller)}>
            Seller
          </button>
        </div>
        {tabId === TabId.Buyer && (
          <div className="flex flex-col gap-6 rounded-[20px] bg-[#1F212C] py-5 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-[17px] font-semibold leading-[20px]">Order ID #1</h3>
                <span className="text-xs leading-[14px] text-grey-4">
                  Created at 2023.04.23 14:45:52
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm leading-[14px]">Deposit waiting</span>
                <button
                  className={twMerge(
                    'flex items-center gap-1 rounded-[14px] bg-tint-pink py-2.5 px-3 text-sm font-semibold leading-[17px]',
                    'text-white/30 bg-[#595959] '
                  )}>
                  <DollarSignIcon />
                  <span>Claim compensation</span>
                </button>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="flex w-full flex-col gap-3">
                <span>Amount</span>
                <div className="bg-white flex items-center justify-between rounded-[10px] bg-opacity-10 py-4 px-5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8">
                      <TokenIcon symbol="USDC" />
                    </div>
                    <span className="text-xs text-grey-4">|</span>
                    <div className="text-white/80 text-[17px] leading-[20px]">On Ethereum</div>
                  </div>
                  <div className="text-[32px] leading-[38px]">300</div>
                </div>
              </div>

              <div className="flex h-[70px] items-center justify-center">
                <ArrowLeftRightIcon />
              </div>

              <div className="flex w-full flex-col gap-3">
                <span>You buy</span>
                <div className="bg-white flex items-center justify-between rounded-[10px] bg-opacity-10 py-4 px-5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8">
                      <TokenIcon symbol="MATIC" />
                    </div>
                    <span className="text-xs text-grey-4">|</span>
                    <div className="text-white/80 text-[17px] leading-[20px]">On Polygon</div>
                  </div>
                  <div className="text-[32px] leading-[38px]">400</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tabId === TabId.Seller && (
          <div className="flex flex-col gap-6 rounded-[20px] bg-[#1F212C] py-5 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-[17px] font-semibold leading-[20px]">Order ID #1</h3>
                <span className="text-xs leading-[14px] text-grey-4">
                  Created at 2023.04.23 14:45:52
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm leading-[14px]">Order waiting</span>
                <button
                  className={twMerge(
                    'flex items-center gap-1 rounded-[14px] bg-tint-pink py-2.5 px-3 text-sm font-semibold leading-[17px]',
                    'text-white/30 bg-[#595959]'
                  )}>
                  <DollarSignIcon />
                  <span>Deposit</span>
                </button>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="flex w-full flex-col gap-3">
                <span>You sell</span>
                <div className="bg-white flex items-center justify-between rounded-[10px] bg-opacity-10 py-4 px-5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8">
                      <TokenIcon symbol="ETH" />
                    </div>
                    <span className="text-xs text-grey-4">|</span>
                    <div className="text-white/80 text-[17px] leading-[20px]">On Ethereum</div>
                  </div>
                  <div className="text-[32px] leading-[38px]">300</div>
                </div>
              </div>

              <div className="flex h-[70px] items-center justify-center">
                <ArrowLeftRightIcon />
              </div>

              <div className="flex w-full flex-col gap-3">
                <span>You will get</span>
                <div className="bg-white flex items-center justify-between rounded-[10px] bg-opacity-10 py-4 px-5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8">
                      <TokenIcon symbol="USDC" />
                    </div>
                    <span className="text-xs text-grey-4">|</span>
                    <div className="text-white/80 text-[17px] leading-[20px]">On Polygon</div>
                  </div>
                  <div className="text-[32px] leading-[38px]">400</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
