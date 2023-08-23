import { ProductSimpleView } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { StyledSpace, StyledItemWrapper } from './ProductHorizontalList.styled'
import { useHorizontalScroll } from 'hooks'

const ProductHorizontalList = (props) => {
  const { products } = props

  const [scrollRef, handleMouseEnter, handleMouseLeave] = useHorizontalScroll()

  return (
    <StyledSpace
      ref={scrollRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {products?.map((product, key) => (
        <StyledItemWrapper key={key}>
          <ProductSimpleView
            area-label={`product-${key + 1}`}
            product={product}
            isRentee
          />
        </StyledItemWrapper>
      ))}
    </StyledSpace>
  )
}

ProductHorizontalList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductHorizontalList
