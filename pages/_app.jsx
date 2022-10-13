import '../styles/globals.css'
import { useWallet, UseWalletProvider } from 'use-wallet'

function MyApp({ Component, pageProps }) {

  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        // This is how connectors get configured
        portis: { dAppId: 'my-dapp-id-123-xyz' },
      }}
    >
      <Component {...pageProps} />
    </UseWalletProvider>
    )
}
export default MyApp
