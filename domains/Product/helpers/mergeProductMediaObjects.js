import { doc, getDoc } from 'firebase/firestore'

import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'

const mergeProductMediaObjects = async (products) => {
  try {
    const mergedProductPromises = products?.map(async (product) => {
      const previewImageId = product?.mediaObjects?.[0]

      if (!previewImageId) return product

      const docRef = doc(firestore, COLLECTIONS.MEDIA_OBJECTS, previewImageId)
      const docSnap = await getDoc(docRef)

      const document = docSnap.exists() ? docSnap.data() : null

      return { ...product, previewImage: document }
    })

    const mediaObjectResponse = await Promise.allSettled(mergedProductPromises)

    return mediaObjectResponse
      ?.map(({ value, reason }) => {
        if (reason) console.error(reason)
        return value || null
      })
      ?.filter(Boolean)
  } catch (error) {
    console.error(error)
  }
}

export default mergeProductMediaObjects
