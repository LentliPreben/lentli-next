import { collection, query, where } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'

const useGetTags = ({ productId }) => {
  /* Query for getting collection reference */
  const tagsQuery = productId
    ? query(
        collection(firestore, COLLECTIONS.TAGS),
        where('productId', '==', productId)
      )
    : query(collection(firestore, COLLECTIONS.TAGS))

  /* Getting collection data */
  return useCollectionDataOnce(tagsQuery)
}

export default useGetTags
