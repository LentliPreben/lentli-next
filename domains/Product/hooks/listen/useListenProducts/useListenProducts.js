import { COLLECTIONS, PRODUCT_STATUSES } from '__constants__'
import { collection, query, where } from 'firebase/firestore'

import { firestore } from 'services/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const useListenProducts = (props) => {
  const categoryId = props?.categoryId

  /* Query for getting collection reference */
  const productsQuery = categoryId
    ? query(
        collection(firestore, COLLECTIONS.PRODUCTS),
        where('categoryId', '==', categoryId),
        where('status', '==', PRODUCT_STATUSES.PUBLISHED)
      )
    : query(
        collection(firestore, COLLECTIONS.PRODUCTS),
        where('status', '==', PRODUCT_STATUSES.PUBLISHED)
      )

  /* Getting collection data */
  return useCollectionData(productsQuery)
}

export default useListenProducts
