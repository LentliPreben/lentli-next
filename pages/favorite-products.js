import { PageLayout, LoadingBox, Breadcrumbs } from 'components'
import { useLikedProducts } from 'contexts'
import { ProductList } from 'domains/Product/components'

const FavoriteProducts = () => {
  const { loading, likedProducts } = useLikedProducts()

  return (
    <PageLayout>
      <LoadingBox loading={loading}>
        <ProductList
          span={{ xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 }}
          products={likedProducts}
        />
      </LoadingBox>
    </PageLayout>
  )
}

export default FavoriteProducts
