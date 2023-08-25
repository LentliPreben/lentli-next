import { RDB_COLLECTIONS } from '__constants__'
import { child, get, getDatabase, ref } from 'firebase/database'

const getAverageProductRating = async (productId) => {
  try {
    let averageRating = 0
    let reviewData = {}

    const dbRef = ref(getDatabase())

    const snapshot = await get(
      child(dbRef, `${RDB_COLLECTIONS.PRODUCT_RATINGS}/${productId}`)
    )

    if (snapshot.exists()) reviewData = snapshot.val()

    if (reviewData && Object.keys(reviewData)) {
      /* Get count of rating */
      const countRating = Object.keys(reviewData)?.length
      /* Sum rating and divide */
      const ratingComputed = countRating
        ? Object.values(reviewData)?.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          ) / countRating
        : null
      averageRating = ratingComputed
    }

    return averageRating
  } catch (error) {
    console.error(error)
  }
}

export default getAverageProductRating
