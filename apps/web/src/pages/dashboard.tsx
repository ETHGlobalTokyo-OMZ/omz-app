/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import { NextPage } from 'next';

import ArrowLeftRightIcon from 'assets/arrow-left-right.svg';
import DollarSignIcon from 'assets/dollar-sign.svg';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import TokenIcon from 'components/TokenIcon';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getBuyerOrders, getSellerListings } from 'queries/market-list';
import { useAccount } from 'wagmi';
import { chainIdEnumToChainName } from 'constants/chain';
import dayjs from 'dayjs';
import relativeTime from 'dayjs-ext/plugin/relativeTime';

dayjs.extend(relativeTime);

enum TabId {
  Buyer = 'buyer',
  Seller = 'seller'
}

const Dashboard: NextPage = () => {
  const [tabId, setTabId] = useState<TabId>(TabId.Buyer);
  const router = useRouter();

  const { address } = useAccount();

  useEffect(() => {
    if (router.query.tab) {
      if (router.query.tab === TabId.Buyer) {
        setTabId(TabId.Buyer);
      } else if (router.query.tab === TabId.Seller) {
        setTabId(TabId.Seller);
      }
    }
  }, [router.query]);

  const { data: lists } = useQuery(['getBuyerOrSellerList', router.query.tab, address], () =>
    router.query.tab === TabId.Seller
      ? getSellerListings('0xF44A53ac17779f27ae9Fc4B352Db4157aDE7a35C' ?? '')
      : getBuyerOrders('0xF44A53ac17779f27ae9Fc4B352Db4157aDE7a35C' ?? '')
  );

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
            onClick={() => router.push('/dashboard?tab=buyer')}>
            Buyer
          </button>
          <button
            className={twMerge(
              'flex w-[114px] items-center justify-center rounded-tr-[4px] border-b border-tint-blue bg-grey-9 py-1.5 leading-[24px] text-tint-blue',
              tabId === TabId.Seller && 'text-white bg-tint-blue font-semibold'
            )}
            onClick={() => router.push('/dashboard?tab=seller')}>
            Seller
          </button>
        </div>
        {tabId === TabId.Buyer &&
          lists &&
          lists.map((list: any) => (
            <div className="flex flex-col gap-6 rounded-[20px] bg-[#1F212C] py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-[17px] font-semibold leading-[20px]">{`Order ID #${list._id}`}</h3>
                  <span className="text-xs leading-[14px] text-grey-4">
                    {`Created at ${dayjs(list.listingTimestamp).format('YYYY.MM.DD h:mm:ss A')}`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{dayjs(list.expiredTimestamp).from(list.listingTimestamp)}</span>
                  <span className="text-sm leading-[14px]">Seller's deposit waiting</span>
                  <button
                    className={twMerge(
                      'flex items-center gap-1 rounded-[14px] bg-tint-pink py-2.5 px-3 text-sm font-semibold leading-[17px]',
                      'text-white/30 bg-[#595959] '
                    )}>
                    <DollarSignIcon />
                    <span>Claim collateral</span>
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
                      <div className="text-white/80 text-[17px] leading-[20px]">{`On ${
                        chainIdEnumToChainName[list.escrow?.[0].chainID]
                      }`}</div>
                    </div>
                    <div className="text-[32px] leading-[38px]">{list.price}</div>
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
                        <TokenIcon symbol={list.sellTokenName} />
                      </div>
                      <span className="text-xs text-grey-4">|</span>
                      <div className="text-white/80 text-[17px] leading-[20px]">{`On ${
                        chainIdEnumToChainName[list.chainID]
                      }`}</div>
                    </div>
                    <div className="text-[32px] leading-[38px]">{list.sellTokenAmount}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {tabId === TabId.Seller &&
          lists &&
          lists.map((list: any) => (
            <div className="flex flex-col gap-6 rounded-[20px] bg-[#1F212C] py-5 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-[17px] font-semibold leading-[20px]">{`Listing ID #${list._id}`}</h3>
                  <span className="text-xs leading-[14px] text-grey-4">
                    {`Created at ${dayjs(list.listingTimestamp).format('YYYY.MM.DD h:mm:ss A')}`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm leading-[14px]">
                    {list.escrow?.[0]._id ? 'Ordered' : 'Order waiting'}
                  </span>
                  <button
                    className={twMerge(
                      'disabled:text-white/30 flex items-center gap-1 rounded-[14px] bg-tint-pink py-2.5 px-3 text-sm font-semibold leading-[17px] disabled:bg-[#595959]'
                    )}
                    onClick={() => router.push(`/deposit?_id=${list._id}`)}
                    disabled={!list.escrow?.[0]._id}>
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
                      <div className="text-white/80 text-[17px] leading-[20px]">{`On ${
                        chainIdEnumToChainName[list.chainID]
                      }`}</div>
                    </div>
                    <div className="text-[32px] leading-[38px]">{list.sellTokenAmount}</div>
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
                      <div className="text-white/80 text-[17px] leading-[20px]">{`On ${
                        chainIdEnumToChainName[list.escrow?.[0].chainID]
                      }`}</div>
                    </div>
                    <div className="text-[32px] leading-[38px]">{list.price}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
