import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { getDocument } from 'services/api/firebase'

/**
 * It fetches a tags documents from Firestore and returns it
 * @param product - The product object that we're getting the tags for.
 * @returns An array with two values. The first value is the tags object, and the second value is a
 * boolean that indicates whether the tags is loading.
 */
const useGetProductTagsData = (product) => {
  /* State for data */
  const [tags, setTags] = useState([])
  /* State for loading */
  const [loading, setLoading] = useState(true)
  /* State for error */
  const [error, setError] = useState(null)

  /* Fetching data */
  const getTags = useCallback(async () => {
    try {
      if (!product?.tags) return setTags(null)
      /* Setting loading state to true */
      setLoading(true)

      /* Getting tags promises*/
      const promises = product.tags.map((tag) =>
        getDocument(COLLECTIONS.TAGS, tag)
      )

      /* Getting tags data */
      const data = await Promise.all(promises)

      /* Setting tags data */
      setTags(data?.filter(Boolean))
    } catch (error) {
      setError(error)
    } finally {
      /* Setting loading state to false */
      setLoading(false)
    }
  }, [product?.tags])

  useEffect(() => {
    product?.tags !== undefined && getTags()
  }, [product?.tags, getTags])

  return [tags, loading, error, getTags]
}

export default useGetProductTagsData
