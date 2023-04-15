import { WagmiConfig, createClient, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { goerli, polygonMumbai } from 'wagmi/chains';

import 'styles/globals.scss';

import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { InjectedConnector } from 'wagmi/connectors/injected';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { provider } = configureChains([goerli, polygonMumbai], [publicProvider()]);

  const queryClient = new QueryClient();

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains: [goerli, polygonMumbai] })],
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
