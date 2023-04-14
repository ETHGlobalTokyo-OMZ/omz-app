/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-shadow */
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const ConnectButton = () => {
  const { address, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector()
  });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="group relative">
        <div>{address}</div>
        <button
          type="button"
          className="absolute -bottom-[100%] right-1/2 hidden translate-x-[50%] group-hover:block"
          onClick={() => disconnect()}>
          Disconnect
        </button>
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
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}>
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        );
      })}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ConnectButton;
