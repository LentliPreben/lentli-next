import { doc } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'

const useGetCategory = ({ categoryId }) => {
  /* Query for getting collection reference */
  const categoryQuery =
    categoryId && doc(firestore, COLLECTIONS.CATEGORIES, categoryId)

  /* Getting collection data */
  return useDocumentDataOnce(categoryQuery)
}

export default useGetCategory
