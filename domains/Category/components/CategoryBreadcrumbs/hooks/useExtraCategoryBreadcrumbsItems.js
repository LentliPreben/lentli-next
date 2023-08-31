import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { getDocument } from 'services/api/firebase'
import { useTranslations } from 'contexts'
import { useHandleError } from 'hooks'

const useExtraCategoryBreadcrumbsItems = (props) => {
  const categoryId = props?.categoryId
  const productId = props?.productId

  const { t } = useTranslations()
  const handleError = useHandleError()

  const [loading, setLoading] = useState(true)
  const [breadcrumbsConfig, setBreadcrumbsConfig] = useState([])

  // Get category by id
  const getCategory = useCallback(
    async (categoryId) => {
      try {
        return await getDocument(COLLECTIONS.CATEGORIES, categoryId)
      } catch (error) {
        handleError(error, t('Error during getting category'))
      }
    },
    [t]
  )

  // Get product by id
  const getProduct = useCallback(
    async (productId) => {
      try {
        return await getDocument(COLLECTIONS.PRODUCTS, productId)
      } catch (error) {
        handleError(error, t('Error during getting product'))
      }
    },
    [t]
  )

  // Get parent category in recursion
  const getParentCategory = useCallback(
    async (categoryId) => {
      const category = await getCategory(categoryId)
      if (!category) {
        return
      } else {
        if (category?.parentId) {
          return [category, ...(await getParentCategory(category?.parentId))]
        } else return [category]
      }
    },
    [getCategory]
  )

  // Get breadcrumbs config (array with category [and product] objects)
  const getBreadcrumbsConfig = useCallback(async () => {
    try {
      setLoading(true)

      let categoriesConfig = []
      if (categoryId) {
        categoriesConfig = await getParentCategory(categoryId)
        setBreadcrumbsConfig(categoriesConfig?.reverse())
      }

      if (productId) {
        const product = await getProduct(productId)

        categoriesConfig =
          product?.categoryId && (await getParentCategory(product.categoryId))

        setBreadcrumbsConfig([...(categoriesConfig?.reverse() || []), product])
      }
    } catch (error) {
      handleError(error, t('Error during getting config for breadcrumbs'))
    } finally {
      setLoading(false)
    }
  }, [categoryId, getParentCategory, getProduct, productId, t])

  // Execute function is in router params are productId or categoryId
  useEffect(() => {
    if (productId || categoryId) getBreadcrumbsConfig()
  }, [productId, categoryId, getBreadcrumbsConfig])

  return [breadcrumbsConfig, loading]
}

export default useExtraCategoryBreadcrumbsItems
