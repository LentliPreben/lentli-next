import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { getDocument } from 'services/api/firebase'

const useGetProductMediaObjectsData = (product) => {
  /* State for data */
  const [mediaObjects, setMediaObjects] = useState([])
  /* State for loading */
  const [loading, setLoading] = useState(true)
  /* State for error */
  const [error, setError] = useState(null)

  /* Fetching data */
  const getMediaObjects = useCallback(async () => {
    try {
      if (!product?.mediaObjects) return setMediaObjects(null)
      /* Setting loading state to true */
      setLoading(true)

      /* Getting mediaObjects promises*/
      const promises = product.mediaObjects.map((mediaObject) =>
        getDocument(COLLECTIONS.MEDIA_OBJECTS, mediaObject)
      )

      /* Getting mediaObjects data */
      const data = await Promise.all(promises)
      setMediaObjects(data)
    } catch (error) {
      setError(error)
    } finally {
      /* Setting loading state to false */
      setLoading(false)
    }
  }, [product?.mediaObjects])

  useEffect(() => {
    product?.mediaObjects !== undefined && getMediaObjects()
  }, [product?.mediaObjects, getMediaObjects])

  return [mediaObjects, loading, error, getMediaObjects]
}

export default useGetProductMediaObjectsData
