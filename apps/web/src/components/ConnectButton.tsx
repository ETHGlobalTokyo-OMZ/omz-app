/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-shadow */
import { shortenAddress } from 'utils/addresss';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import ChevronDownBoldIcon from 'assets/chevron-down-bold.svg';
import PowerIcon from 'assets/power.svg';

const ConnectButton = () => {
  const { address, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector()
  });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="group relative h-full cursor-pointer">
        <div className="flex items-center gap-2 rounded-full bg-grey-9 py-3 px-4 ">
          <span className="text-sm font-semibold leading-[142.34%] text-grey-2">
            {address && shortenAddress(address, 10)}
          </span>
          <div className="flex h-3 w-3 items-center justify-center text-tint-blue">
            <ChevronDownBoldIcon />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-10 hidden h-full w-[176px] translate-y-full cursor-pointer pt-2 group-hover:block">
          <button
            className="bg-white flex h-[44px] w-full items-center gap-1.5 rounded-lg py-3 px-4"
            onClick={() => disconnect()}>
            <PowerIcon />
            <span className="text-black text-sm font-semibold leading-[142.34%]">
              Disconnect Wallet
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => {
        if (!connector) return null;
        return (
          <button
            type="button"
            className="bg-white rounded-full py-3 px-4 text-sm leading-[142.34%] text-tint-blue"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}>
            {!isLoading && 'Connect'}
            {!connector.ready && ' (Unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && '(Connecting)'}
          </button>
        );
      })}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ConnectButton;
