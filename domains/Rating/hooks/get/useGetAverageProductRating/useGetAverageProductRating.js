import { useEffect, useState } from 'react'

import { RDB_COLLECTIONS } from '__constants__'
import { useTranslations } from 'contexts'
import { notification } from 'utils'
import database from 'services/firebase/database'
import { ref, onValue } from 'firebase/database'

const useGetAverageProductRating = (productId) => {
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState()

  const { t } = useTranslations()

  useEffect(() => {
    try {
      setLoading(true)

      const onValueCallback = onValue(
        ref(database, `${RDB_COLLECTIONS.PRODUCT_RATINGS}/${productId}`),
        (snapshot) => {
          const reviewData = snapshot?.val() || {}
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
            setReview(ratingComputed)
          } else setReview(0)
        },
        {
          onlyOnce: true
        }
      )

      return () => {
        onValueCallback()
      }
    } catch (error) {
      notification({
        type: 'error',
        title: t('Error'),
        message: `${t(
          'An error occurred while fetching review data'
        )}: ${error}`
      })
    } finally {
      setLoading(false)
    }
  }, [productId, t])

  return [review, loading]
}

export default useGetAverageProductRating
