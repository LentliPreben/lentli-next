import { COLLECTIONS, PRODUCT_STATUSES } from '__constants__'
import { collection, limit, orderBy, query, where } from 'firebase/firestore'

import { firestore } from 'services/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useMemo } from 'react'
import { useMergeProductMediaObjects } from 'domains/Product/hooks'

const useGetProductsByUser = (
  userId,
  { exceptCurrentProduct, currentProductId },
  limitFetch
) => {
  const [data, loading, error] = useCollectionData(
    userId &&
      query(
        collection(firestore, COLLECTIONS.PRODUCTS),
        where('_createdBy', '==', userId),
        where('status', '==', PRODUCT_STATUSES.PUBLISHED),
        limit(limitFetch),
        orderBy('_createdAt', 'desc')
      )
  )

  const filteredProducts = useMemo(
    () =>
      exceptCurrentProduct
        ? data?.filter((currProduct) => currProduct?._id !== currentProductId)
        : data,
    [currentProductId, exceptCurrentProduct, data]
  )

  const [transformedProduct, transformedProductLoading] =
    useMergeProductMediaObjects(filteredProducts)

  const loadings = useMemo(
    () => loading || transformedProductLoading,
    [loading, transformedProductLoading]
  )

  return [transformedProduct, loadings, error]
}
export default useGetProductsByUser
