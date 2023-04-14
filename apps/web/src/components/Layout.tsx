import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import BellIcon from 'assets/bell.svg';
import SearchInput from './SearchInput';

const ConnectButton = dynamic(() => import('./ConnectButton'), {
  ssr: false
});

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="min-w-screen flex h-full min-h-screen w-full bg-[#191B23]">
    <div className="flex w-full max-w-[240px] flex-col justify-between bg-[#242731] px-4 py-9">
      <h1>OMZ</h1>
      <div className="flex w-full flex-col gap-10">
        <div>
          <h2 className="py-4">OTC Market</h2>
          <hr />
          <div className="flex flex-col py-2">
            <Link className="py-2" href="/">
              Buy
            </Link>
            <Link className="py-2" href="/sell">
              Sell
            </Link>
          </div>
        </div>
        <div>
          <h2 className="py-4">Dashboard</h2>
        </div>
      </div>
      <div />
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

export default Layout;
