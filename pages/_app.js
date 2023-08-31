import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'rc-drawer/assets/index.css'
import 'rc-tooltip/assets/bootstrap_white.css'
import 'rc-slider/assets/index.css'
import 'rc-pagination/assets/index.css'

import 'styles/globals.css'

import {
  CartProvider,
  LikedProductsProvider,
  TranslationsProvider
} from 'contexts'

function MyApp({ Component, pageProps }) {
  return (
    <TranslationsProvider>
      <CartProvider>
        <LikedProductsProvider>
          <Component {...pageProps} />
        </LikedProductsProvider>
      </CartProvider>
    </TranslationsProvider>
  )
}

export default MyApp
