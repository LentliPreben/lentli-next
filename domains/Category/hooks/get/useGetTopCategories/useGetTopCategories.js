import { collection, query, where } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'

const useGetTopCategories = () => {
  const categoriesQuery = query(
    collection(firestore, COLLECTIONS.CATEGORIES),
    where('isTopLevel', '==', true)
  )

  return useCollectionDataOnce(categoriesQuery)
}

export default useGetTopCategories
