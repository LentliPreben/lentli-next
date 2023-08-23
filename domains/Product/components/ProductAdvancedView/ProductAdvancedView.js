import { Col, Divider, Grid, Row, Typography } from 'antd'
import {
  ProductCharacteristics,
  ProductDetails,
  ProductLessorView,
  ProductRangeSelect,
  ProductRangeSelectFixed,
  ProductsListFromCurrentLessor
} from 'domains/Product/components'

import { ImagesPreview } from 'components'
import PropTypes from 'prop-types'
import { ReviewsList } from 'domains/Review/components'
import { TagList } from 'domains/Tag/components'
import { getTransformedImageUrl } from 'helpers'
import { useMemo } from 'react'
import { useProductRangeSelectActions } from 'domains/Product/hooks'
import { useTranslations } from 'contexts'

const { Title, Text } = Typography
const { useBreakpoint } = Grid

const ProductAdvancedView = (props) => {
  const { product, address, mediaObjects, user, tags, reviews } = props

  const { lg, sm } = useBreakpoint()
  const { t } = useTranslations()
  const {
    range,
    periodInDays,
    pricePerDayDisplay,
    pricePerPeriodDisplay,
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
      <Row gutter={32} className="mb-48">
        <Col xs={24} md={24} lg={24} xxl={24} className="mb-24">
          <ImagesPreview
            mediaObjects={mediaObjectsUrls}
            productId={product?._id}
            productName={product?.name}
          />
        </Col>
        <Col xs={24} lg={15} xl={16}>
          <Row>
            <Col span={24}>
              <ProductDetails product={product} address={address} />
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            {showCharacteristics && (
              <>
                <Col span={24}>
                  <Col span={24} className="mb-8">
                    <Title level={5}>{t('Characteristics')}</Title>
                  </Col>
                </Col>
                <Col span={24}>
                  <ProductCharacteristics characteristic={product?.fields} />
                </Col>
                <Col span={24}>
                  <Divider />
                </Col>
              </>
            )}
            {showDescription && (
              <>
                <Col span={24}>
                  <Text>{product?.description}</Text>
                </Col>
                <Col span={24}>
                  <Divider />
                </Col>
              </>
            )}

            {showTags && (
              <>
                <Col span={24} className="mb-8">
                  <Title level={5}>{t('Tags')}</Title>
                </Col>
                <Col span={24}>
                  <TagList tags={tags} />
                </Col>
                <Col span={24}>
                  <Divider />
                </Col>
              </>
            )}
            {showReviews && (
              <>
                <Col span={24} className="mb-8">
                  <Title level={5}>{t('Reviews')}</Title>
                </Col>
                <Col span={24}>
                  <ReviewsList reviews={reviews} />
                </Col>
                <Col span={24}>
                  <Divider />
                </Col>
              </>
            )}
            <Col span={24}>
              <ProductLessorView user={user} />
            </Col>
          </Row>
        </Col>
        {lg && (
          <Col lg={9} xl={8} className="relative">
            <ProductRangeSelect
              disabledDates={disabledDates}
              productId={product._id}
              handleChangeRange={handleChangeRange}
              periodInDays={periodInDays}
              range={range}
              pricePerDayDisplay={pricePerDayDisplay}
              pricePerPeriodDisplay={pricePerPeriodDisplay}
              formattedDateRange={formattedDateRange}
              computedDayLabel={computedDayLabel}
              className="sticky"
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col span={24}>
          <ProductsListFromCurrentLessor user={user} />
        </Col>
      </Row>
      {!lg && (
        <ProductRangeSelectFixed
          disabledDates={disabledDates}
          productId={product._id}
          handleChangeRange={handleChangeRange}
          periodInDays={periodInDays}
          range={range}
          pricePerDayDisplay={pricePerDayDisplay}
          pricePerPeriodDisplay={pricePerPeriodDisplay}
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
