import {
  ProductCharacteristics,
  ProductDetails,
  ProductLessorView,
  ProductRangeSelect,
  ProductRangeSelectFixed,
  ProductsListFromCurrentLessor
} from 'domains/Product/components'

import { ImagesPreview, Title, Text, Divider } from 'components'
import PropTypes from 'prop-types'
import { ReviewsList } from 'domains/Review/components'
import { TagList } from 'domains/Tag/components'
import { getTransformedImageUrl } from 'helpers'
import { useMemo } from 'react'
import { useProductRangeSelectActions } from 'domains/Product/hooks'
import { useTranslations } from 'contexts'
import { useBreakpoint } from 'hooks'

const ProductAdvancedView = (props) => {
  const { product, address, mediaObjects, user, tags, reviews } = props

  const { lg } = useBreakpoint()
  const { t } = useTranslations()
  const {
    range,
    periodInDays,
    pricePerDayWithFeesDisplay,
    pricePerPeriodWithFeesDisplay,
    computedDayLabel,
    disabledDates,
    formattedDateRange,
    handleChangeRange
  } = useProductRangeSelectActions(product)

  const mediaObjectsUrls = useMemo(
    () =>
      mediaObjects?.map((mediaObject, index) => {
        const size = index === 0 ? 1600 : 1024
        return getTransformedImageUrl(mediaObject, size)
      }),
    [mediaObjects]
  )

  const showDescription = !!product?.description
  const showCharacteristics = !!product?.fields?.length
  const showTags = !!tags?.length
  const showReviews = !!reviews?.length

  return (
    <>
      <div gutter={32} className="row mb-48">
        <div className="co-12 mb-24">
          <ImagesPreview
            mediaObjects={mediaObjectsUrls}
            productId={product?._id}
            productName={product?.name}
          />
        </div>
        <div className="col col-lg-8">
          <div className="row">
            <div className="col-12">
              <ProductDetails product={product} address={address} />
            </div>
            <div className="col-12">
              <Divider />
            </div>
            {showCharacteristics && (
              <>
                <div className="col-12 mb-8">
                  <Title as="h5">{t('Characteristics')}</Title>
                </div>
                <div className="col-12">
                  <ProductCharacteristics characteristic={product?.fields} />
                </div>
                <div className="col-12">
                  <Divider />
                </div>
              </>
            )}
            {showDescription && (
              <>
                <div className="col-12">
                  <Text>{product?.description}</Text>
                </div>
                <div className="col-12">
                  <Divider />
                </div>
              </>
            )}

            {showTags && (
              <>
                <div className="col-12 mb-8">
                  <Title as="h5">{t('Tags')}</Title>
                </div>
                <div className="col-12">
                  <TagList tags={tags} />
                </div>
                <div className="col-12">
                  <Divider />
                </div>
              </>
            )}
            {showReviews && (
              <>
                <div className="col-12">
                  <Title as="h5">{t('Reviews')}</Title>
                </div>
                <div className="col-12">
                  <ReviewsList reviews={reviews} />
                </div>
                <div className="col-12">
                  <Divider />
                </div>
              </>
            )}
            <div className="col-12">
              <ProductLessorView user={user} />
            </div>
          </div>
        </div>
        {lg && (
          <div className="col-lg-4 relative">
            <ProductRangeSelect
              disabledDates={disabledDates}
              productId={product?._id}
              handleChangeRange={handleChangeRange}
              periodInDays={periodInDays}
              range={range}
              pricePerDayWithFeesDisplay={pricePerDayWithFeesDisplay}
              pricePerPeriodWithFeesDisplay={pricePerPeriodWithFeesDisplay}
              formattedDateRange={formattedDateRange}
              computedDayLabel={computedDayLabel}
              className="sticky"
            />
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-12">
          <ProductsListFromCurrentLessor user={user} />
        </div>
      </div>
      {!lg && (
        <ProductRangeSelectFixed
          disabledDates={disabledDates}
          productId={product?._id}
          handleChangeRange={handleChangeRange}
          periodInDays={periodInDays}
          range={range}
          pricePerDayWithFeesDisplay={pricePerDayWithFeesDisplay}
          pricePerPeriodWithFeesDisplay={pricePerPeriodWithFeesDisplay}
          formattedDateRange={formattedDateRange}
          computedDayLabel={computedDayLabel}
        />
      )}
    </>
  )
}

ProductAdvancedView.propTypes = {
  product: PropTypes.object,
  mediaObjects: PropTypes.array,
  address: PropTypes.object,
  user: PropTypes.object,
  productsByCurrentUser: PropTypes.array,
  tags: PropTypes.array,
  reviews: PropTypes.array
}
export default ProductAdvancedView
