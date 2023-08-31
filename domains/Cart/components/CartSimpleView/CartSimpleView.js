import TitleStyled from './CartSimpleView.styled'
import {
  Image,
  LoadingBox,
  Text,
  Title,
  Button,
  Card,
  Divider
} from 'components'
import { formatPrice, getCheckoutId } from 'utils'
import { useCart, useLikedProducts, useTranslations } from 'contexts'

import { getTransformedImageUrl } from 'helpers'
import noImage from 'public/assets/no-image.png'
import { useCallback } from 'react'
import { useGetProductAdditionalData } from 'domains/Product/hooks'
import trash from 'public/assets/trash.svg'
import calendar from 'public/assets/calendar.svg'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL

const CartSimpleView = (props) => {
  const { cart } = props

  const { product, dateRange, countDays } = cart
  const { previewImage } = product

  const { deleteCartItem, cartDataForTransfer } = useCart()
  const { likedDataForTransfer } = useLikedProducts()

  const { t } = useTranslations()

  const { category, loading } = useGetProductAdditionalData({
    categoryId: product?.categoryId
  })

  const formattedDateRange = `${dateRange?.startDate} - ${dateRange?.endDate}`
  const productId = product?._id
  const categoryName = category?.name ? category?.name?.toUpperCase() : 'n/a'
  const pricePerPeriodDisplay = formatPrice(
    countDays * product?.pricePerDay,
    product?.currency
  )

  const handleDeleteCartItem = useCallback(
    () => deleteCartItem(productId, dateRange),
    [dateRange, deleteCartItem, productId]
  )
  const handleImageError = useCallback((e) => {
    e.currentTarget.src = noImage
  }, [])

  const handleCheckout = useCallback(() => {
    const checkoutId = getCheckoutId({
      productId: product?._id,
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate,
      amount: 1
    })
    const appUrl = `${NEXT_PUBLIC_APP_URL}/checkout/${checkoutId}`

    const encodedCartData = encodeURIComponent(cartDataForTransfer)
    const encodedLikedData = encodeURIComponent(likedDataForTransfer)

    const queryString = `?cart=${encodedCartData}&liked=${encodedLikedData}&checkoutId=${checkoutId}`

    window.open(`${appUrl}${queryString}`, '_blank')
  }, [
    cartDataForTransfer,
    dateRange?.endDate,
    dateRange?.startDate,
    likedDataForTransfer,
    product?._id
  ])

  const previewImgUrl = getTransformedImageUrl(previewImage)
  return (
    <LoadingBox loading={loading}>
      <Card>
        <div className="row mb-16 align-center gx-3">
          <div className="col-5 col-sm-4">
            <Image
              alt={t('Product')}
              src={previewImgUrl}
              onError={handleImageError}
              borderRadius="var(--border-radius-default)"
            />
          </div>

          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12">
                <Text secondary>{categoryName}</Text>
              </div>
              <div className="col-12">
                <TitleStyled>{product?.name}</TitleStyled>
              </div>
              <div className="col-12 flex align-center mb-4 gap-4">
                <Image
                  width={18}
                  height={18}
                  src={calendar}
                  alt={t('Calendar')}
                  className="flex"
                />
                <Text variant="body2">{formattedDateRange}</Text>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-between align-middle">
          <div className="col flex align-center">
            <Title as="h5">{pricePerPeriodDisplay}</Title>
          </div>
          <div className="col flex align-center justify-end">
            <Button
              size="sm"
              type="link"
              onClick={handleCheckout}
              className="flex justify-center p-0 px-12">
              {t('Checkout')}
            </Button>
            <Divider type="vertical" className="mx-8" />
            <Button
              onClick={handleDeleteCartItem}
              danger
              type="link"
              icon={<Image src={trash} alt={t('Remove')} />}
            />
          </div>
        </div>
      </Card>
    </LoadingBox>
  )
}

export default CartSimpleView
