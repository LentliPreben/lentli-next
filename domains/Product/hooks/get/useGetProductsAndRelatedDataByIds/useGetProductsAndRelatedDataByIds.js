import { COLLECTIONS } from '__constants__'
import { useLoading } from 'hooks'
import { useCallback, useEffect, useState } from 'react'
import { getDocument } from 'services/api/firebase'
import { useTranslations } from 'contexts'

const useGetProductsAndRelatedDataByIds = (productIds) => {
  const { t } = useTranslations()

  const [productsAndRelatedData, setProductsAndRelatedData] = useState()
  const [loading, setLoading] = useState(true)

  const getProduct = async (productId) => {
    try {
      const product = await getDocument(COLLECTIONS.PRODUCTS, productId)

      const [brand, category] = await Promise.all([
        product?.brandId
          ? await getDocument(COLLECTIONS.BRANDS, product?.brandId)
          : {},
        product?.categoryId
          ? await getDocument(COLLECTIONS.CATEGORIES, product?.categoryId)
          : {}
      ])

      return { ...product, brand, category }
    } catch (error) {
      console.error(t('Error during getting product'))
    }
  }

  const getProductsAndRelatedData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await Promise.all(
        productIds?.map((_id) => getProduct(_id))
      )
      setProductsAndRelatedData(result)
    } catch (error) {
      console.error(t('Error during getting product'))
    } finally {
      setLoading(false)
    }
    // t function inside dependencies create loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIds])

  useEffect(() => {
    productIds && getProductsAndRelatedData()
  }, [getProductsAndRelatedData, productIds])

  const computedLoading = useLoading(!productsAndRelatedData, loading)
  return [productsAndRelatedData, computedLoading]
}

export default useGetProductsAndRelatedDataByIds
