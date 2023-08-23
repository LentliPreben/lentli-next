import { collection, query, where } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { useMemo } from 'react'

const useGetMediaObject = ({ productId, onlyImages }) => {
  /* Query for getting collection reference */
  const mediaObjectsQuery = productId
    ? query(
        collection(firestore, COLLECTIONS.MEDIA_OBJECTS),
        where('productId', '==', productId)
      )
    : query(collection(firestore, COLLECTIONS.MEDIA_OBJECTS))

  const [mediaObjects, loadingMediaObjects] =
    useCollectionDataOnce(mediaObjectsQuery)

  const formattedMediaObjects = useMemo(
    () =>
      mediaObjects
        ?.filter(({ type, url }) =>
          onlyImages ? (type?.includes('image') ? url : null) : url
        )
        ?.map(({ url }) => url),
    [mediaObjects, onlyImages]
  )

  /* Getting collection data */
  return [formattedMediaObjects, loadingMediaObjects]
}

export default useGetMediaObject
