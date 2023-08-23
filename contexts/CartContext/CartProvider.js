import { COLLECTIONS, MOMENT_FORMATS } from '__constants__'
import { useCallback, useEffect, useState } from 'react'

import CartContext from './CartContext'
import { getDocument } from 'services/api/firebase'
import { message } from 'antd-notifications-messages'
import moment from 'moment'
import { notification } from 'antd'
import { useTranslations } from 'contexts'

const { DAY_MONTH_YEAR } = MOMENT_FORMATS

const CartProvider = ({ children }) => {
  const { t } = useTranslations()

  const [countCartItems, setCountCartItems] = useState()
  const [cartItems, setCartItems] = useState()
  const [cartDataForTransfer, setCartDataForTransfer] = useState()

  const getDataForTransfer = () => {
    setCartDataForTransfer(localStorage.getItem('cart') || '{}')
  }

  const getCartItems = useCallback(async () => {
    try {
      const cart = localStorage.getItem('cart') || '{}'

      const cartFormatted = JSON.parse(cart)

      const productIds = Object.keys(cartFormatted)

      const productsData = await Promise.all(
        productIds.map(async (productId) => {
          // Get product from data base
          const product = await getDocument(COLLECTIONS.PRODUCTS, productId)
          const previewImageId = product?.mediaObjects?.[0]

          const previewImage = await getDocument(
            COLLECTIONS.MEDIA_OBJECTS,
            previewImageId
          )

          const transformedProduct = { ...product, previewImage }
          /* Get object with date ranges in format
           { '26.06.2023 - 29.06.2023': true,
             '30.06.2023 - 05.07.2023': true } */
          const dates =
            cartFormatted?.[productId] &&
            Object.keys(cartFormatted?.[productId])

          return dates.map((date) => {
            // Get separated date from range
            const dateRange = date.split('-')

            // Get count of days between dates
            const countDays =
              moment(dateRange?.[1], DAY_MONTH_YEAR).diff(
                moment(dateRange?.[0], DAY_MONTH_YEAR),
                'days'
              ) + 1

            return {
              product: transformedProduct,
              dateRange: {
                startDate: dateRange?.[0],
                endDate: dateRange?.[1]
              },
              countDays
            }
          })
        })
      )
      const productsInCart = productsData.flat()

      getDataForTransfer()

      setCartItems(productsInCart)
      setCountCartItems(productsInCart?.length)
    } catch (error) {
      message.error(t('Error during getting products'))
    }
  }, [t])

  const deleteCartItem = useCallback(
    (productId, dateRange) => {
      const cart = JSON.parse(localStorage.getItem('cart') || {})
      let updatedCart = { ...cart }

      const formattedDateRange = `${dateRange?.startDate}-${dateRange?.endDate}`

      // Remove selected date range from object
      const updatedProduct = _.omit(cart[productId], `${formattedDateRange}`)

      // If product has at least one date update field
      if (Object.keys(updatedProduct)?.length)
        updatedCart[productId] = updatedProduct
      // else remove empty object
      else delete updatedCart?.[productId]

      localStorage.setItem('cart', JSON.stringify(updatedCart))
      getCartItems()
    },
    [getCartItems]
  )

  // Add data to carts
  const addCartItem = useCallback(
    (productId, date) => {
      const cart = localStorage.getItem('cart') || '{}'

      const cartFormatted = JSON.parse(cart)
      const formattedStartDate = moment(date?.startDate).format(DAY_MONTH_YEAR)
      const formattedEndDate = moment(date?.endDate).format(DAY_MONTH_YEAR)

      const dateRange = `${formattedStartDate} - ${formattedEndDate}`

      const currentProduct = cartFormatted?.[productId] || {}

      const updatedCurrentProduct = {
        [productId]: { ...currentProduct, [dateRange]: true }
      }
      const updatedCart = { ...cartFormatted, ...updatedCurrentProduct }

      localStorage.setItem('cart', JSON.stringify(updatedCart))
      getCartItems()
      notification.success({
        message: t('Success'),
        description: t('Product was added to the cart')
      })
    },
    [getCartItems]
  )

  useEffect(() => {
    getCartItems()
  }, [getCartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        deleteCartItem,
        countCartItems,
        cartDataForTransfer,
        addCartItem
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
