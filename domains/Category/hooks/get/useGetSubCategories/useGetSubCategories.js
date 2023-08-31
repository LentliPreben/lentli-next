import { useEffect, useState, useCallback } from 'react'

import { collection, where, getDocs, query } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useTranslations } from 'contexts'
import { useHandleError } from 'hooks'

const useGetSubCategories = (categoryId) => {
  const { t } = useTranslations()
  const handleError = useHandleError()

  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const getSubCategories = useCallback(async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(
        query(
          collection(firestore, COLLECTIONS.CATEGORIES),
          where('parentId', '==', categoryId)
        )
      )
      const fetchedSubCategories = querySnapshot?.docs?.map((doc) => doc.data())

      setSubCategories(fetchedSubCategories)
    } catch (error) {
      handleError(error, t('Error during getting subcategories'))
    } finally {
      setLoading(false)
    }
  }, [categoryId, t])

  useEffect(() => {
    if (categoryId) getSubCategories()
  }, [categoryId, getSubCategories])

  return [subCategories, loading]
}
export default useGetSubCategories
