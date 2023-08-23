import { collection, query, where } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const useListenCategories = (props) => {
  const onlyTopLevel = props?.onlyTopLevel

  /* Query for getting collection reference */
  const categoriesQuery = onlyTopLevel
    ? query(
        collection(firestore, COLLECTIONS.CATEGORIES),
        where('isTopLevel', '==', true)
      )
    : query(collection(firestore, COLLECTIONS.CATEGORIES))

  /* Getting collection data */
  return useCollectionData(categoriesQuery)
}

export default useListenCategories
