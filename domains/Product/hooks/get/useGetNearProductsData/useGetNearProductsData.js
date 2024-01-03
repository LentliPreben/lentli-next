import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { getDocument } from 'services/api/firebase'
import { useHandleError } from 'hooks'

const useGetNearProductsData = (nearProducts, numVisible) => {
  const [productsData, setProductsData] = useState([])
  const handleError = useHandleError()

  const getCategory = useCallback(
    async (categoryId) => getDocument(COLLECTIONS.CATEGORIES, categoryId),
    []
  )

  const getParentCategory = useCallback(
    async (categoryId) => {
      const category = await getCategory(categoryId)
      if (!category) {
        return null
      } else {
        if (category?.parentId) {
          // eslint-disable-next-line no-return-await
          return await getParentCategory(category?.parentId)
        } else return category
      }
    },
    [getCategory]
  )

  useEffect(() => {
    const getAddresses = async () => {
      if (!nearProducts?.length) return setProductsData([])

      const visibleProducts = nearProducts.slice(0, numVisible)
      const products = await Promise.all(
        visibleProducts.map(async (product) => {
          try {
            const address = product?.addressId
              ? await getDocument(COLLECTIONS.ADDRESSES, product.addressId)
              : {}

            const topCategory = product?.categoryId
              ? await getParentCategory(product?.categoryId)
              : null

            return { address, topCategory, ...product }
          } catch (error) {
            handleError(error)
            return null
          }
        })
      )
      setProductsData(products?.filter(Boolean))
    }

    getAddresses()
  }, [nearProducts, numVisible, handleError, getParentCategory])

  return productsData
}

export default useGetNearProductsData
