import { PageWrapper, Section, Title } from 'components'
import { CategoriesAdvancedList } from 'domains/Category/components'
import { useListenCategories } from 'domains/Category/hooks'
import { ProductsList } from 'domains/Product/components'
import { useListenProducts } from 'domains/Product/hooks'

const Categories = () => {
  const [categories, loadingCategories] = useListenCategories({
    onlyTopLevel: true
  })
  const [products, loadingProducts] = useListenProducts()

  return (
    <PageWrapper
      className="categories-page"
      loading={loadingCategories || loadingProducts}>
      <Section>
        <div className="row mb-6">
          <div className="col-12">
            <CategoriesAdvancedList data={categories} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Title as="h3">Nearest rent for you</Title>
          </div>
          <div className="col-12">
            <ProductsList disablePagination data={products} />
          </div>
        </div>
      </Section>
    </PageWrapper>
  )
}

export default Categories
