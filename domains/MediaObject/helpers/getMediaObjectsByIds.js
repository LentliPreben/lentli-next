import { COLLECTIONS } from '__constants__'
import { getDocument } from 'services/api/firebase'

const getMediaObjectsByIds = async (mediaObjectIds) => {
  try {
    if (mediaObjectIds?.length) {
      const result = await Promise.all(
        mediaObjectIds?.map((mediaObjectId) =>
          getDocument(COLLECTIONS.MEDIA_OBJECTS, mediaObjectId)
        )
      )
      return result?.filter(Boolean)
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

export default getMediaObjectsByIds
