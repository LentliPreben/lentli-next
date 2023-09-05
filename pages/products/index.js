import { useMemo, useState } from 'react'
import {
  useMergeProductMediaObjects,
  useSearchAllProducts
} from 'domains/Product/hooks'

import { COLLECTIONS } from '__constants__'
import { LoadingBox } from 'components'
import { PageLayout } from 'components'
import { ProductsAllView } from 'domains/Product/components'
import { getTopLevelCategories } from 'domains/Category/helpers'
import { useGetDocumentsByIds } from 'services/api/firebase'
import { useLoading } from 'hooks'
import { useTranslations } from 'contexts'

const Products = (props) => {
  const { t } = useTranslations()

  const [currentPage, setCurrentPage] = useState(1)

  const { topLevelCategoriesJSON } = props

  const topLevelCategories = JSON.parse(topLevelCategoriesJSON)

  const searchParams = useMemo(
    () => ({ perPage: 8, page: currentPage }),
    [currentPage]
  )

  const {
    productIds,
    loading: typeSenseProductsLoading,
    totalResults
  } = useSearchAllProducts(searchParams)

  const productParams = useMemo(
    () => ({ collection: COLLECTIONS.PRODUCTS, ids: productIds }),
    [productIds]
  )

  const [products, productLoading] = useGetDocumentsByIds(productParams)
  const [mergedProducts, mergedProductsLoading] =
    useMergeProductMediaObjects(products)

  const headingProps = {
    title: t('Products'),
    textAlign: 'left'
  }

  const loading = useLoading([
    typeSenseProductsLoading,
    mergedProductsLoading,
    productLoading
  ])

  return (
    <PageLayout
      headingProps={headingProps}
      topLevelCategories={topLevelCategories}>
      <LoadingBox spinnerProps={{ height: '100%' }} loading={loading}>
        <ProductsAllView
          products={mergedProducts}
          totalResults={totalResults}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </LoadingBox>
    </PageLayout>
  )
}

export async function getServerSideProps(props) {
  try {
    const [, topLevelCategories] = await getTopLevelCategories()
    const topLevelCategoriesJSON = JSON.stringify(topLevelCategories || {})

    return {
      props: { topLevelCategoriesJSON }
    }
  } catch (error) {
    console.error(error)
  }
}

export default Products
