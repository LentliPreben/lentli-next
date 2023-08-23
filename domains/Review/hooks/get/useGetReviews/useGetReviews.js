import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useState, useEffect, useCallback } from 'react'
import { COLLECTIONS } from '__constants__'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { firestore } from 'services/firebase'
import { useHandleError } from 'hooks'
import { getDocument } from 'services/api/firebase'
import { useTranslations } from 'contexts'

const useGetReviews = (productId) => {
  const handleError = useHandleError()
  const { t } = useTranslations()

  const [expandedReviews, setExpandedReviews] = useState()
  const [loading, setLoading] = useState(true)

  /* Getting collection data */
  const [reviews, loadingReviews, error] = useCollectionData(
    productId &&
      query(
        collection(firestore, COLLECTIONS.REVIEWS),
        where('productId', '==', productId),
        orderBy('_createdAt', 'desc')
      )
  )

  const getRelatedData = useCallback(async () => {
    try {
      const results = await Promise.all(
        reviews?.map(async (review) => {
          const rentee = await getDocument(COLLECTIONS.USERS, review?.renteeId)
          return { review, rentee }
        })
      )
      setExpandedReviews(results)
    } catch (error) {
      handleError(error, t('Error during getting reviews'))
    } finally {
      setLoading(false)
    }
  }, [handleError, reviews, t])

  useEffect(() => {
    if (!loadingReviews) {
      getRelatedData()
    }
  }, [reviews, loadingReviews, getRelatedData])

  return [expandedReviews, loadingReviews || loading, error]
}

export default useGetReviews
