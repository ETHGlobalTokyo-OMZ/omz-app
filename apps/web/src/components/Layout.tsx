import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import BellIcon from 'assets/bell.svg';
import ArrowLeftRightBoldIcon from 'assets/arrow-left-right-bold.svg';
import DashboardIcon from 'assets/dashboard.svg';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import SearchInput from './SearchInput';

const ConnectButton = dynamic(() => import('./ConnectButton'), {
  ssr: false
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const isBuyPage = router.pathname === '/' || router.pathname.startsWith('/buy');
  const isSellPage = router.pathname.startsWith('/sell');

  return (
    <div className="min-w-screen flex h-full min-h-screen w-full bg-[#191B23]">
      <div className="flex w-full max-w-[240px] flex-col bg-[#242731] px-4 py-9">
        <Link href="/" className="px-2.5 text-2xl font-bold leading-[142.34%]">
          OMZ
        </Link>
        <div className="mt-36 flex w-full flex-col gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 text-tint-blue">
                <ArrowLeftRightBoldIcon />
              </div>
              <h2 className="py-4 text-lg font-semibold leading-[27px]">OTC Market</h2>
            </div>
            <div className="bg-white/10 h-[0.5px] w-full" />
            <div className="flex flex-col py-2">
              <Link
                className={twMerge(
                  'cursor-pointer rounded-[10px] py-3.5 px-4 leading-[19px]',
                  isBuyPage && 'bg-grey-10 font-semibold text-tint-blue'
                )}
                href="/">
                Buy
              </Link>
              <Link
                className={twMerge(
                  'cursor-pointer rounded-[10px] py-3.5 px-4 leading-[19px]',
                  isSellPage && 'bg-grey-10 font-semibold text-tint-blue'
                )}
                href="/sell">
                Sell
              </Link>
            </div>
          </div>
          <div>
            <Link
              className="flex items-center gap-2 py-4 text-lg font-semibold leading-[27px]"
              href="/dashboard">
              <div className="h-4 w-4 text-tint-blue">
                <DashboardIcon />
              </div>
              Dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-9 py-10 px-6">
        <div className="flex items-center gap-3">
          <SearchInput />
          <div
            className="flex h-[44px]
         w-[44px] flex-shrink-0 items-center justify-center rounded-full bg-[#22252E]">
            <BellIcon />
          </div>
          <ConnectButton />
        </div>
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
};
export default Layout;
