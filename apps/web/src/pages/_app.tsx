import { WagmiConfig, createClient, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { polygonZkEvmTestnet } from 'wagmi/chains';

import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { provider } = configureChains([polygonZkEvmTestnet], [publicProvider()]);

  // Set up client
  const client = createClient({
    autoConnect: true,
    provider
  });
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  );
};

export default MyApp;
