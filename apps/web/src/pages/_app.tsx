import { WagmiConfig, createClient, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { polygonZkEvmTestnet } from 'wagmi/chains';

import 'styles/globals.scss';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { provider } = configureChains([polygonZkEvmTestnet], [publicProvider()]);

  // Set up client
  const client = createClient({
    autoConnect: true,
    provider
  });
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
