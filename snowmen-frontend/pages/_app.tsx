import store from '../store';
import { Provider } from 'react-redux';
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../components/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { provider, chains } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: "" }), // Alchemy API key 예: Dqd2lbU3LAHEDpnGgCTV4m-LHFDiUDYc
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Snowmen Fight',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <Header></Header>
          <ToastContainer />
          <Component {...pageProps} />
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;