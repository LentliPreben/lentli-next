import { collection, query, where, getDocs } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'

const getTopLevelCategories = async () => {
  try {
    const categoriesSnapshot = await getDocs(
      query(
        collection(firestore, COLLECTIONS.CATEGORIES),
        where('isTopLevel', '==', true)
      )
    )

    const categories = categoriesSnapshot?.docs?.map((doc) => doc.data())

    return categories || []
  } catch (error) {
    console.error(error)
  }
}

export default getTopLevelCategories
