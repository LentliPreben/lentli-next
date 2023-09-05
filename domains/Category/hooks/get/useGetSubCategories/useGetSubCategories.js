import { collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useHandleError } from 'hooks'
import { useTranslations } from 'contexts'

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
      const subCategoriesWithProducts = fetchedSubCategories?.filter(
        (category) => category?.productIds?.length > 0
      )
      setSubCategories(subCategoriesWithProducts)
    } catch (error) {
      handleError(error, t('Error during getting subcategories'))
    } finally {
      setLoading(false)
    }
  }, [categoryId, handleError, t])

  useEffect(() => {
    if (categoryId) getSubCategories()
  }, [categoryId, getSubCategories])

  return [subCategories, loading]
}
export default useGetSubCategories
