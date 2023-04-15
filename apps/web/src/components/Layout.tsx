/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import BellIcon from 'assets/bell.svg';
import ArrowLeftRightBoldIcon from 'assets/arrow-left-right-bold.svg';
import DashboardIcon from 'assets/dashboard.svg';
import ChevronRightIcon from 'assets/chevron-right.svg';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { getNotifications } from 'queries/notification';
import { useAccount } from 'wagmi';
import OMZLogo from 'assets/omz-logo.svg';

const ConnectButton = dynamic(() => import('./ConnectButton'), {
  ssr: false
});

interface Notification {
  sid: string;
  title: string;
  message: string;
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { address } = useAccount();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notifcationViewRef = useRef<HTMLDivElement>(null);

  const isBuyPage = router.pathname === '/' || router.pathname.startsWith('/order');
  const isSellPage = router.pathname.startsWith('/sell');

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    if (address) {
      getNotifications(address).then((res) => {
        setNotifications(res);
      });
    }
  }, [address]);

  return (
    <div
      className="min-w-screen flex h-full min-h-screen w-full bg-[#191B23]"
      onClick={(e) => {
        if (notifcationViewRef.current) {
          if (!notifcationViewRef.current.contains(e.target as Node)) {
            setIsNotificationOpen(false);
          }
        }
      }}>
      <div className="flex w-full max-w-[240px] flex-col bg-[#242731] px-4 py-9">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold leading-[142.34%]">
          <OMZLogo />
          <span>OMZ</span>
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
          <div className="w-full" />
          <div className="relative">
            <button
              className="flex h-[44px]
         w-[44px] flex-shrink-0 items-center justify-center rounded-full bg-[#22252E]"
              onClick={(e) => {
                e.stopPropagation();
                setIsNotificationOpen(true);
              }}>
              <BellIcon />
            </button>
            <div
              className={twMerge(
                'absolute bottom-0 left-1/2 z-10 hidden h-full -translate-x-1/2 translate-y-full pt-2',
                isNotificationOpen && 'block'
              )}
              ref={notifcationViewRef}>
              <div className="flex w-[318px] flex-col gap-5 rounded-lg bg-[#242731] p-3">
                <h2 className="text-white text-sm font-semibold leading-[17px]">Notification</h2>
                <div className="flex flex-col gap-4">
                  {notifications.map((notification, index) => (
                    <div
                      key={`${index}${notification.sid}`}
                      className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-1.5">
                        <span className="leadning-[13px] text-[12px]">{notification.title}</span>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-1 text-[11px]"
                        onClick={() => setIsNotificationOpen(false)}>
                        <span>view</span>
                        <ChevronRightIcon />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ConnectButton />
        </div>
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
};
export default Layout;
