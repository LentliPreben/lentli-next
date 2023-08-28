import 'styles/globals.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import {
  CartProvider,
  LikedProductsProvider,
  TranslationsProvider
} from 'contexts'
import { ConfigProvider } from 'antd'

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider theme={{}}>
      <TranslationsProvider>
        <CartProvider>
          <LikedProductsProvider>
            <Component {...pageProps} />
          </LikedProductsProvider>
        </CartProvider>
      </TranslationsProvider>
    </ConfigProvider>
  )
}

export default MyApp
