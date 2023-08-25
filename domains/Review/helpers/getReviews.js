import { getDocument } from 'services/api/firebase'
import { COLLECTIONS } from '__constants__'
import { where, orderBy, collection, query, getDocs } from 'firebase/firestore'
import { firestore } from 'services/firebase'
import moment from 'moment'

const getReviews = async (productId) => {
  try {
    if (productId) {
      const reviews = await getDocs(
        query(
          collection(firestore, COLLECTIONS.REVIEWS),
          where('productId', '==', productId),
          orderBy('_createdAt', 'desc')
        )
      )
      const results = await Promise.all(
        reviews?.docs?.map(async (review) => {
          const reviewData = review?.data()
          const rentee = await getDocument(
            COLLECTIONS.USERS,
            reviewData?.renteeId
          )
          const dateFormatted = moment(
            reviewData?._createdAt?.toDate()
          ).fromNow()

          return { review: { ...reviewData, dateFormatted }, rentee }
        })
      )

      return results
    } else return []
  } catch (error) {
    console.error(error)
  }
}

export default getReviews
