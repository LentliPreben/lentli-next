import {
  CardStyled,
  ImageOverlay,
  imageRow,
  likeFormStyles
} from './ProductSimpleView.styles'
import { RateSelect, RelativeImage, Text, Title } from 'components'
import {
  currencySymbol,
  updateUserViewsStatistics
} from 'domains/Product/helpers'

import { ProductLike } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { getTransformedImageUrl, calculateFinalPayment } from 'helpers'
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

  const { t, language } = useTranslations()
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

  const productFinalPrice =
    product?.pricePerDayWithFees || calculateFinalPayment(pricePerDay)

  return (
    <CardStyled bordered={false} onClick={handleProductClick} padding="0">
      <div className="row g-0 flex align-center flex-1">
        <div className="col-12 full-height relative">
          <RelativeImage withOverlay={false} src={previewImageUrl} />
          <ImageOverlay />
          <ProductLike style={likeFormStyles} productId={_id} />
        </div>
      </div>
      <div className="row p-12 justify-between" style={imageRow}>
        <div className="col-12 mb-4" style={{ height: 'fit-content' }}>
          <Text className="mb-0" ellipsis={{ rows: 2 }}>
            {name}
          </Text>
          <Text className="mb-0" secondary ellipsis={{ rows: 1 }}>
            {category?.names?.[language?.toUpperCase()] || category?.name}
          </Text>
        </div>

        <div className="col-12 flex align-end justify-between" wrap={false}>
          <div className="flex align-baseline gap-4">
            <Title as="h4">{productFinalPrice || 'n/a'}</Title>
            <Title as="h4">{productCurrencySymbol}</Title>
            <Text secondary>
              {' / '}
              {t('day')}
            </Text>
          </div>
          <RateSelect mb={-1} size="sm" value={avgRating || 0} />
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
