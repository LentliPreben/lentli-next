import { getDocument } from 'services/api/firebase'
import { COLLECTIONS } from '__constants__'

const getTagsByIds = async (tagIds) => {
  try {
    if (tagIds?.length) {
      const result = await Promise.all(
        tagIds?.map((tagId) => getDocument(COLLECTIONS.TAGS, tagId))
      )
      return result?.filter(Boolean)
    } else {
      return []
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default getTagsByIds
