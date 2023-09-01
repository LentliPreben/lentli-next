import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { firestore } from 'services/firebase'
import { useHandleError } from 'hooks'
import { useTranslations } from 'contexts'

const useGetProductPriceRangeByCategory = (categoryId) => {
  const handleError = useHandleError()
  const { t } = useTranslations()

  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 })
  const [loading, setLoading] = useState(true)

  const getPriceRange = useCallback(async () => {
    try {
      setLoading(true)

      const [productWithMinPrice, productWithMaxPrice] = await Promise.all([
        getDocs(
          query(
            collection(firestore, 'products'),
            where('categoryId', '==', categoryId),
            orderBy('pricePerDay'),
            limit(1)
          )
        ),
        getDocs(
          query(
            collection(firestore, 'products'),
            where('categoryId', '==', categoryId),
            orderBy('pricePerDay', 'desc'),
            limit(1)
          )
        )
      ])

      setPriceRange({
        minPrice: productWithMinPrice?.docs?.[0]?.data()?.pricePerDay || 0,
        maxPrice: productWithMaxPrice?.docs?.[0]?.data()?.pricePerDay || 0
      })
    } catch (error) {
      handleError(error, t('Error during getting price range'))
    } finally {
      setLoading(false)
    }
    // t function inside dependencies create loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

  useEffect(() => {
    if (categoryId) {
      getPriceRange()
    }
  }, [categoryId, getPriceRange])

  return [priceRange, loading]
}

export default useGetProductPriceRangeByCategory
