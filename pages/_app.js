import 'styles/globals.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

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
