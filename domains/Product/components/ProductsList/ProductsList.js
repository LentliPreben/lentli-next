import { ProductSimpleView } from 'domains/Product/components'
import { List } from 'components'

const ITEMS_PER_PAGE = 24

const ProductsList = (props) => {
  const { data, limit, disablePagination } = props

  const computeDisablePagination =
    disablePagination || limit < ITEMS_PER_PAGE || data?.length < ITEMS_PER_PAGE

  // when DB is ready, use limit for request instead of slice method
  return (
    <List
      id="products-list"
      list={data}
      itemsPerPage={ITEMS_PER_PAGE}
      disablePagination={computeDisablePagination}
      renderList={(list) => (
        <div className="products-list">
          {list?.map(({ title, ...rest }, index) => (
            <div className="product-list-item" key={`${title}-${index}`}>
              <ProductSimpleView title={title} {...rest} />
            </div>
          ))}
        </div>
      )}
    />
  )
}

export default ProductsList
