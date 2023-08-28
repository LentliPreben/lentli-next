import {
  CardStyled,
  ImageOverlay,
  imageRow,
  likeFormStyles
} from './ProductSimpleView.styles'
import { Space } from 'antd'
import { RateSelect, RelativeImage, Text, Title } from 'components'
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
      <div className="row g-0 flex align-center flex-1">
        <div className="col-12 full-height relative">
          <RelativeImage withOverlay={false} src={previewImageUrl} />
          <ImageOverlay />
          <ProductLike style={likeFormStyles} productId={_id} />
        </div>
      </div>
      <div className="row px-16 pb-16 pt-8 justify-between" style={imageRow}>
        <div className="col-12 mb-4" style={{ height: 'fit-content' }}>
          <Text className="mb-0" ellipsis={{ rows: 2 }}>
            {name}
          </Text>
          <Text className="mb-0" secondary ellipsis={{ rows: 1 }}>
            {category?.name}
          </Text>
        </div>

        <div className="col-12 flex align-end justify-between" wrap={false}>
          <Space size={2} className="flex align-baseline">
            <Title as="h4">{pricePerDay || 'n/a'}</Title>
            <Title as="h4">{productCurrencySymbol}</Title>
            <Text secondary>
              {' / '}
              {t('day')}
            </Text>
          </Space>
          <Space className="flex flex-col align-end" size={0}>
            <RateSelect mb={-1} size="sm" value={avgRating || 0} />
          </Space>
        </div>
      </div>
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
