import { ProductSimpleView } from 'domains/Product/components'

import PropTypes from 'prop-types'
import { StyledList } from './ProductList.styles'
import { Typography } from 'antd'
import { useTranslations } from 'contexts'

const ProductList = (props) => {
  const {
    products,
    emptyProps,
    onDraftsToPublishSelect,
    span,
    pagination,
    maxHeight,
    ...rest
  } = props

  const { t } = useTranslations()

  const emptyParams = {
    ...emptyProps,
    message: t('No products have been added yet')
  }

  if (!products?.length) {
    return (
      <Typography.Text type="secondary">{emptyParams?.message}</Typography.Text>
    )
  }
  return products?.length ? (
    <StyledList
      wrapperStyles={{
        overflowY: 'auto'
      }}
      span={span}
      {...rest}
      dataSource={products}
      emptyProps={emptyParams}
      renderItem={(product, index) => (
        <ProductSimpleView
          product={product}
          area-label={`product-${index + 1}`}
          key={product?._id}
        />
      )}
      pagination={pagination}
    />
  ) : (
    <Typography.Text type="secondary">{emptyParams?.message}</Typography.Text>
  )
}

ProductList.propTypes = {
  products: PropTypes.array,
  emptyProps: PropTypes.object,
  actions: PropTypes.any,
  onSelect: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onDraftsToPublishSelect: PropTypes.func,
  selectedDrafts: PropTypes.array,
  isDraftsPage: PropTypes.bool,
  span: PropTypes.object,
  pagination: PropTypes.object,
  maxHeight: PropTypes.string
}

export default ProductList
