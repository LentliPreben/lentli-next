import { Button, Card, Col, Divider, Row, Typography, theme } from 'antd'
import { DisplayDateStyled, TitleStyled } from './CartSimpleView.styled'
import { Image, LoadingBox } from 'components'
import { formatPrice, getCheckoutId } from 'utils'
import { useCart, useLikedProducts, useTranslations } from 'contexts'

import { Icon } from '@qonsoll/icons'
import { getTransformedImageUrl } from 'helpers'
import noImage from 'public/assets/no-image.png'
import { useCallback } from 'react'
import { useGetProductAdditionalData } from 'domains/Product/hooks'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL

const { Text, Title } = Typography

const CartSimpleView = (props) => {
  const { cart } = props

  const { product, dateRange, countDays } = cart
  const { previewImage } = product

  const { deleteCartItem, cartDataForTransfer } = useCart()
  const { likedDataForTransfer } = useLikedProducts()

  const { t } = useTranslations()

  const { borderRadiusLG } = theme.useToken().token

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
        <Row gutter={[16, 16]} className="mb-16 align-center">
          <Col xs={9} sm={7}>
            <Image
              alt={t('Product')}
              src={previewImgUrl}
              onError={handleImageError}
              borderRadius={borderRadiusLG}
            />
          </Col>

          <Col xs={24} sm={17}>
            <Row gutter={[0, 4]}>
              <Col span={24}>
                <Text type="secondary">{categoryName}</Text>
              </Col>
              <Col span={24}>
                <TitleStyled level={5}>{product?.name}</TitleStyled>
              </Col>
              <Col span={24} className="flex align-center mb-4">
                <Icon size={14} name="CalendarOutlined" className="mr-8" />
                <DisplayDateStyled>{formattedDateRange}</DisplayDateStyled>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          <Col className="flex">
            <Title level={5}>{pricePerPeriodDisplay}</Title>
          </Col>
          <Col className="flex align-center">
            <Button
              size="small"
              type="link"
              onClick={handleCheckout}
              className="flex justify-center">
              {t('Checkout')}
            </Button>
            <Divider type="vertical" className="mx-8 py-4" />
            <Button
              onClick={handleDeleteCartItem}
              danger
              type="link"
              size="small">
              <Icon size={16} name="Trash3Outlined" fill="currentColor" />
            </Button>
          </Col>
        </Row>
      </Card>
    </LoadingBox>
  )
}

export default CartSimpleView
