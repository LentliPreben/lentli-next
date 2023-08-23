import { useCallback, useEffect, useState } from 'react'
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore'
import { useHandleError } from 'hooks'
import { useTranslations } from 'contexts'
import { firestore } from 'services/firebase'

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
        minPrice: productWithMinPrice?.docs?.[0]?.data()?.pricePerDay,
        maxPrice: productWithMaxPrice?.docs?.[0]?.data()?.pricePerDay
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
