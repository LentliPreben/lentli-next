import { LikeForm } from 'components'
import PropTypes from 'prop-types'
import { useLikedProducts } from 'contexts'
import { useMemo } from 'react'

const ProductLike = (props) => {
  const { productId } = props

  const { likedProductIds, handleLikeProduct } = useLikedProducts()
  // checks whether liked-products-arr contains current product
  // if so - then like value is true
  const isLikedProduct = useMemo(
    () => likedProductIds?.includes(productId),
    [likedProductIds, productId]
  )

  const onChange = (newValue) => handleLikeProduct(productId, newValue)

  return <LikeForm {...props} value={isLikedProduct} onChange={onChange} />
}

ProductLike.propTypes = {
  productId: PropTypes.string
}

export default ProductLike
