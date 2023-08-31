import { PageLayout, LoadingBox } from 'components'
import { useLikedProducts, useTranslations } from 'contexts'
import { ProductList } from 'domains/Product/components'

const FavoriteProducts = () => {
  const { loading, likedProducts } = useLikedProducts()
  const { t } = useTranslations()

  const headingProps = {
    title: t('Favorite products'),
    textAlign: 'left'
  }

  return (
    <PageLayout headingProps={headingProps}>
      <LoadingBox loading={loading}>
        <ProductList
          products={likedProducts}
          wrapperStyles={{ overflowY: 'initial' }}
        />
      </LoadingBox>
    </PageLayout>
  )
}

export default FavoriteProducts
