import { PageLayout, LoadingBox, Breadcrumbs, FilterButton } from 'components'
import { FilterProvider } from 'contexts'
import { ProductsByCategoryAdvancedView } from 'domains/Product/components'
import { useGetCategory } from 'domains/Category/hooks'
import { useScreen } from 'hooks'

const ProductsByCategory = (props) => {
  const { categoryId } = props

  const [category, loadingCategory] = useGetCategory({ categoryId })
  const { isSmallScreen } = useScreen()

  const showFilter = isSmallScreen && !category?.subcategories?.length

  return (
    <LoadingBox loading={loadingCategory}>
      <FilterProvider category={category}>
        <PageLayout
          filter={
            showFilter && <FilterButton filterVisibility category={category} />
          }
          breadcrumbs={<Breadcrumbs categoryId={category?._id} />}>
          <ProductsByCategoryAdvancedView category={category} />
        </PageLayout>
      </FilterProvider>
    </LoadingBox>
  )
}

export default ProductsByCategory

export async function getServerSideProps(props) {
  return {
    props: { categoryId: props?.query?.categoryId }
  }
}
