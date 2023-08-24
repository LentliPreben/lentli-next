import { COLLECTIONS, PRODUCT_STATUSES } from '__constants__'
import {
  where,
  limit,
  orderBy,
  collection,
  getDocs,
  query
} from 'firebase/firestore'
import { mergeProductMediaObjects } from 'domains/Product/helpers'
import { firestore } from 'services/firebase'

const getProductsByUser = async (
  userId,
  { exceptCurrentProduct, currentProductId, limitFetch = 10 }
) => {
  try {
    if (userId) {
      const docsSnapshot = await getDocs(
        query(
          collection(firestore, COLLECTIONS.PRODUCTS),
          where('_createdBy', '==', userId),
          where('status', '==', PRODUCT_STATUSES.PUBLISHED),
          limit(limitFetch),
          orderBy('_createdAt', 'desc')
        )
      )
      const docs = docsSnapshot?.docs
        ?.map((snapshot) => snapshot?.data())
        ?.filter((value) => value)

      const filteredProducts = exceptCurrentProduct
        ? docs?.filter((currProduct) => currProduct?._id !== currentProductId)
        : docs

      const expandedProducts = await mergeProductMediaObjects(filteredProducts)

      return expandedProducts
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

export default getProductsByUser
