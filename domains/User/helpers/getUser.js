import { getDocument } from 'services/api/firebase'
import { COLLECTIONS } from '__constants__'

const getUser = async (userId) => {
  try {
    if (userId) {
      const user = await getDocument(COLLECTIONS.USERS, userId)

      return user
    } else return {}
  } catch (error) {
    console.error(error)
  }
}

export default getUser
