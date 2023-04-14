import { WagmiConfig, createClient, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { polygonZkEvmTestnet } from 'wagmi/chains';

import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { provider } = configureChains([polygonZkEvmTestnet], [publicProvider()]);

  const queryClient = new QueryClient();

  // Set up client
  const client = createClient({
    autoConnect: true,
    provider
  });
  return (
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </WagmiConfig>
  );
};

export default MyApp;
