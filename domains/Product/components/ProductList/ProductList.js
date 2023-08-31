import { ProductSimpleView } from 'domains/Product/components'

import PropTypes from 'prop-types'
import { StyledList } from './ProductList.styles'
import { Text } from 'components'
import { useTranslations } from 'contexts'

const ProductList = (props) => {
  const {
    products,
    emptyProps,
    onDraftsToPublishSelect,
    pagination,
    maxHeight,
    wrapperStyles = {},
    ...rest
  } = props

  const { t } = useTranslations()

  const emptyParams = {
    ...emptyProps,
    message: t('No products have been added yet')
  }

  if (!products?.length) {
    return <Text secondary>{emptyParams?.message}</Text>
  }
  return products?.length ? (
    <StyledList
      wrapperStyles={{
        overflowY: 'scroll',
        ...wrapperStyles
      }}
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
    <Text secondary>{emptyParams?.message}</Text>
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
  pagination: PropTypes.object,
  maxHeight: PropTypes.string
}

export default ProductList
