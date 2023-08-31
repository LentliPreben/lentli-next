import { PageLayout, LoadingBox, Breadcrumbs } from 'components'
import { useLikedProducts } from 'contexts'
import { ProductList } from 'domains/Product/components'

const FavoriteProducts = () => {
  const { loading, likedProducts } = useLikedProducts()

  return (
    <PageLayout>
      <LoadingBox loading={loading}>
        <ProductList products={likedProducts} />
      </LoadingBox>
    </PageLayout>
  )
}

export default FavoriteProducts
