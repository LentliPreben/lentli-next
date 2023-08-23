import { Breadcrumbs, PageLayout } from 'components'
import { useMemo, useState } from 'react'
import {
  useMergeProductMediaObjects,
  useSearchAllProducts
} from 'domains/Product/hooks'

import { COLLECTIONS } from '__constants__'
import { LoadingBox } from 'components'
import { ProductsAllView } from 'domains/Product/components'
import { useGetDocumentsByIds } from 'services/api/firebase'
import { useLoading } from 'hooks'

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1)

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

  const loading = useLoading([
    typeSenseProductsLoading,
    mergedProductsLoading,
    productLoading
  ])

  return (
    // <PageLayout breadcrumbs={<Breadcrumbs />}> temporary commented
    <PageLayout>
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

export default Products