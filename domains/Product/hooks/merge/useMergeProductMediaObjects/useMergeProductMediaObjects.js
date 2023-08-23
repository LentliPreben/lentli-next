import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { notification } from 'antd'

const useMergeProductMediaObjects = (products) => {
  const [transformedProduct, setTransformedProduct] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async (products) => {
    try {
      if (!products?.length) return products

      const mergedProductPromises = products?.map(async (product) => {
        const previewImageId = product?.mediaObjects?.[0]

        if (!previewImageId) return product

        const docRef = doc(firestore, COLLECTIONS.MEDIA_OBJECTS, previewImageId)
        const docSnap = await getDoc(docRef)

        const document = docSnap.exists() ? docSnap.data() : null

        return { ...product, previewImage: document }
      })

      const mediaObjectResponse = await Promise.allSettled(
        mergedProductPromises
      )

      const transformedData = mediaObjectResponse
        ?.map(({ value, reason }) => {
          if (reason) console.error(reason)
          return value || null
        })
        ?.filter(Boolean)

      transformedData?.length && setTransformedProduct(transformedData)
    } catch (error) {
      notification.error({ message: 'Error during get product media object' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    isMounted && fetchData(products)

    return () => {
      isMounted = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])
  return [transformedProduct, loading]
}

export default useMergeProductMediaObjects
