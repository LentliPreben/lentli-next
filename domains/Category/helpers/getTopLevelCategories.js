import { COLLECTIONS, PRODUCT_STATUSES } from '__constants__'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { firestore } from 'services/firebase'

const getTopLevelCategories = async () => {
  try {
    const allCategoriesSnapshot = await getDocs(
      query(collection(firestore, COLLECTIONS.CATEGORIES))
    )
    const allCategories = allCategoriesSnapshot?.docs?.map((doc) => doc.data())
    const productsSnapshot = await getDocs(
      query(collection(firestore, COLLECTIONS.PRODUCTS))
    )
    const products = productsSnapshot?.docs?.map((doc) => doc.data())

    const topCategoriesSnapshot = await getDocs(
      query(
        collection(firestore, COLLECTIONS.CATEGORIES),
        where('isTopLevel', '==', true)
      )
    )
    const topCategories = topCategoriesSnapshot?.docs?.map((doc) => doc.data())

    const productsByCategoryId = products.reduce((result, product) => {
      const categoryId = product.categoryId
      const isPublishedProduct = product?.status === PRODUCT_STATUSES.PUBLISHED
      if (categoryId && isPublishedProduct) {
        result[categoryId] = (result[categoryId] || 0) + 1
      }
      return result
    }, {})

    const countRecursively = (categoryId) => {
      let totalCount = productsByCategoryId?.[categoryId] || 0

      const categoryDoc = allCategories?.find(
        (category) => category?._id === categoryId
      )

      if (categoryDoc?.subcategories?.length) {
        categoryDoc?.subcategories?.forEach((subcategoryId) => {
          totalCount += countRecursively(subcategoryId)
        })
      }

      return totalCount
    }

    const topCategoriesWithProducts = topCategories
      .map((category) => {
        const hasProducts = countRecursively(category?._id)
        return hasProducts ? category : null
      })
      .filter(Boolean)

    return topCategoriesWithProducts || []
  } catch (error) {
    console.error(error)
  }
}

export default getTopLevelCategories
