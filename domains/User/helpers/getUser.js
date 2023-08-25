import { getDocument } from 'services/api/firebase'
import { COLLECTIONS, MOMENT_FORMATS } from '__constants__'
import moment from 'moment'

const getUser = async (userId) => {
  try {
    if (userId) {
      const user = await getDocument(COLLECTIONS.USERS, userId)
      const formattedJoinedDate = moment(user?._createdAt?.toDate()).format(
        MOMENT_FORMATS.MONTH_YEAR
      )

      return { ...user, formattedJoinedDate }
    } else return {}
  } catch (error) {
    console.error(error?.message)
  }
}

export default getUser
