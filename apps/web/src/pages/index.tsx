/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import TokenIcon from 'components/TokenIcon';
import { chainIdEnumToChainName } from 'constants/chain';
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getMarketList } from 'queries/market-list';
import { useQuery } from 'react-query';

const Home: NextPage = () => {
  const { data: marketList } = useQuery('getMarketList', getMarketList);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <h1 className="text-[28px] leading-[42px] opacity-80">OTC market</h1>
        <span className="text-white/[.40] text-xs">|</span>
        <h2>Buy</h2>
      </div>
      <div>
        <table className="w-full">
          <tr className="bg-[#22252E] text-sm font-normal leading-[17px]">
            <th className="py-3 px-4 text-left">Token</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Collateral</th>
            <th className="py-3 px-4 text-left">Expiration Time</th>
            <th className="py-3 px-4 text-left" />
          </tr>
          {marketList &&
            marketList.map((market: any, index: number) => (
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-normal leading-[17px]">{index + 1}.</span>
                    <TokenIcon symbol={market.sellTokenName} />
                    <div className="flex flex-col gap-1">
                      <span className="text-[15px] font-normal leading-[17px]">{`${market.sellTokenAmount} ${market.sellTokenName}`}</span>
                      <span className="text-[13px] font-normal leading-[13px] text-grey-4">
                        {`On ${chainIdEnumToChainName[market.chainID]}`}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <TokenIcon symbol="USDC" />
                    <div className="flex flex-col gap-1">
                      <span className="font-normal leading-[17px]">{market.price}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <TokenIcon symbol={market.collateralTokenName} />
                    <div className="flex flex-col gap-1">
                      <span className="font-normal leading-[17px]">{`${market.collateralTokenAmount} ${market.collateralTokenName}`}</span>
                      <span className="text-[13px] font-normal leading-[13px] text-grey-4">
                        {`On ${chainIdEnumToChainName[market.chainID]}`}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center font-normal leading-[17px]">
                    {dayjs(market.listingTimestamp).format('YYYY.MM.DD h:mm:ss A')}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <button
                      className="flex w-20 items-center justify-center rounded-[14px] bg-tint-blue py-2 text-sm font-semibold leading-[17px]"
                      onClick={() => router.push(`/order?id=${market._id}`)}>
                      Buy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Home;
