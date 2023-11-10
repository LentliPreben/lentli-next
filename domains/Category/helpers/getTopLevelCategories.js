import { collection, getDocs, query } from 'firebase/firestore'

import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'

const getTopLevelCategories = async () => {
  try {
    const defaultValue = [[], [], []]
    const allCategoriesSnapshot = await getDocs(
      query(collection(firestore, COLLECTIONS.CATEGORIES))
    )
    const categories = allCategoriesSnapshot?.docs?.map((doc) => doc.data())

    // Since you're no longer filtering categories by whether they have products,
    // there's no need to fetch products here. You can remove the getCollection function.

    if (!categories?.length) return defaultValue

    const topLevelCategories = categories.filter(
      (category) => category?.isTopLevel
    )

    // No need to find and filter subcategories based on product existence.
    const subCategories = categories.filter((category) => !category?.isTopLevel)

    // Returning all categories without filtering by product existence
    return [categories, topLevelCategories, subCategories] || defaultValue
  } catch (error) {
    console.error(error)
    return defaultValue
  }
}

export default getTopLevelCategories

// === DO NOT DELETE THIS COMMENTED CODE. CUSTOMER REQUEST WAS TO CHANGE LOGIC and SHOW ALL CATEGORIES but possibly he will return previous logic
// to hide categories without published products inside
// import { COLLECTIONS, PRODUCT_STATUSES } from '__constants__'
// import { collection, getDocs, limit, query, where } from 'firebase/firestore'

// import { firestore } from 'services/firebase'

// const getTopLevelCategories = async () => {
//   try {
//     const defaultValue = [[], [], []]
//     const allCategoriesSnapshot = await getDocs(
//       query(collection(firestore, COLLECTIONS.CATEGORIES))
//     )
//     const categories = allCategoriesSnapshot?.docs?.map((doc) => doc.data())

//     const getCollection = async (categoryId) => {
//       const queryConfig = query(
//         collection(firestore, COLLECTIONS.PRODUCTS),
//         where('categoryId', '==', categoryId),
//         where('status', '==', PRODUCT_STATUSES.PUBLISHED),
//         limit(1)
//       )

//       const docSnapshot = await getDocs(queryConfig)

//       const docs = docSnapshot?.docs?.map((doc) => doc.data())
//       return docs
//     }

//     if (!categories?.length) return defaultValue

//     const topLevelCategories = []
//     let filteredCategories
//     let subCategories

//     const categoriesPromises = categories?.map(async (category) => {
//       if (category?.isTopLevel) return null
//       const [product] = await getCollection(category?._id)
//       if (!product) return null

//       const parentId = category?.parentId
//       const isCategoryExist = topLevelCategories?.find(
//         (item) => item?._id === parentId
//       )

//       if (!isCategoryExist) {
//         const topLevelCategory = categories.find(
//           (item) => item?._id === parentId && item?.isTopLevel
//         )

//         topLevelCategory && topLevelCategories.push(topLevelCategory)
//       }
//       return category
//     })

//     const filteredCategoriesResolve = await Promise.all(categoriesPromises)

//     const subCategoriesFiltered = filteredCategoriesResolve?.filter(Boolean)
//     filteredCategories = [...topLevelCategories, ...subCategoriesFiltered]
//     subCategories = [...subCategoriesFiltered]
//     return (
//       [filteredCategories, topLevelCategories, subCategories] || defaultValue
//     )
//   } catch (error) {
//     console.error(error)
//   }
// }

// export default getTopLevelCategories
