import {
  CardStyled,
  ImageOverlay,
  imageRow,
  likeFormStyles
} from './ProductSimpleView.styles'
import { Col, Row, Space, Typography } from 'antd'
import { RateSelect, RelativeImage } from 'components'
import {
  currencySymbol,
  updateUserViewsStatistics
} from 'domains/Product/helpers'

import { ProductLike } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { getTransformedImageUrl } from 'helpers'
import { useGetCategory } from 'domains/Category/hooks'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts'

const { Text, Title } = Typography

const ProductSimpleView = (props) => {
  const { product } = props

  const {
    _id,
    avgRating,
    currency,
    name,
    pricePerDay,
    categoryId,
    previewImage
  } = product

  const { t } = useTranslations()
  const router = useRouter()

  const [category, loadingCategory] = useGetCategory({ categoryId })

  const handleOpenProduct = () => {
    router.push(`/products/${_id}`)
  }
  const handleProductClick = async () => {
    handleOpenProduct()
    await updateUserViewsStatistics(product)
  }
  const productCurrencySymbol = currencySymbol(currency)

  const previewImageUrl = getTransformedImageUrl(previewImage)

  return (
    <CardStyled bordered={false} onClick={handleProductClick}>
      <Row className="flex align-center flex-1">
        <Col span={24} className="full-height">
          <RelativeImage withOverlay={false} src={previewImageUrl} />
          <ImageOverlay />
          <ProductLike style={likeFormStyles} productId={_id} />
        </Col>
      </Row>
      <Row className="px-16 pb-16 pt-8 justify-between" style={imageRow}>
        <Col span={24} className="mb-4" style={{ height: 'fit-content' }}>
          <Typography.Paragraph
            className="mb-0"
            level={5}
            ellipsis={{ rows: 2 }}>
            {name}
          </Typography.Paragraph>
          <Text className="mb-0" type="secondary" ellipsis={{ rows: 1 }}>
            {category?.name}
          </Text>
        </Col>

        <Col span={24} className="flex align-end justify-between" wrap={false}>
          <Space size={2} className="flex align-baseline">
            <Title level={4}>{pricePerDay || 'n/a'}</Title>
            <Title level={4}>{productCurrencySymbol}</Title>
            <Text type="secondary">
              {' / '}
              {t('day')}
            </Text>
          </Space>
          <Space className="flex flex-col align-end" size={0}>
            <RateSelect mb={-1} size="sm" value={avgRating || 0} />
          </Space>
        </Col>
      </Row>
    </CardStyled>
  )
}
ProductSimpleView.propTypes = {
  previewImgUrl: PropTypes.string,
  _id: PropTypes.string,
  avgRating: PropTypes.number,
  currency: PropTypes.string,
  name: PropTypes.string,
  pricePerDay: PropTypes.number,
  categoryId: PropTypes.string
}
export default ProductSimpleView
