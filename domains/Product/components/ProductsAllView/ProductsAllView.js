import { memo } from 'react'
import { NoData, Pagination } from 'components'
import { ProductList } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'
import { useBreakpoint } from 'hooks'

const ProductsAllView = (props) => {
  const { products, totalResults, currentPage, onPageChange } = props
  const { isExtraSmallScreen } = useBreakpoint()

  const { t } = useTranslations()

  const heightToNegotiate = isExtraSmallScreen
    ? 'calc(100dvh - 242px)'
    : 'calc(100dvh - 198px)'

  return (
    <div className="row flex-1">
      <div className="col-12 flex-1">
        {products?.length ? (
          <ProductList
            maxHeight={heightToNegotiate}
            products={products}
            pagination={
              <Pagination
                style={{ justifyContent: 'center', display: 'flex' }}
                defaultCurrent={1}
                total={totalResults}
                pageSize={8}
                current={currentPage}
                onChange={onPageChange}
              />
            }
          />
        ) : (
          <NoData
            description={t("There aren't products for current category")}
          />
        )}
      </div>
    </div>
  )
}

ProductsAllView.propTypes = {
  category: PropTypes.object,
  products: PropTypes.array,
  totalResults: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
}

export default memo(ProductsAllView)
