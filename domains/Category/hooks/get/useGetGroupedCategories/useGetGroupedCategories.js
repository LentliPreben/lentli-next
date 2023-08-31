import { useEffect, useMemo, useState } from 'react'

import _ from 'lodash'
import { useGetCategories } from 'domains/Category/hooks'

const useGetGroupedCategories = () => {
  const [allCategories, loadingAllCategories] = useGetCategories()

  const [topLevelCategories, setTopLevelCategories] = useState()
  const [subcategories, setSubcategories] = useState()
  const [isRoot, setIsRoot] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState()

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    setIsRoot(false)
  }
  const handleGoBack = () => {
    setIsRoot(true)
  }

  useEffect(() => {
    if (!loadingAllCategories) {
      const _topLevelCategories = allCategories?.filter(
        ({ isTopLevel }) => isTopLevel
      )
      const subcategories = _.differenceBy(
        allCategories,
        _topLevelCategories,
        '_id'
      )

      setTopLevelCategories(_topLevelCategories)
      setSubcategories(subcategories)
    }
  }, [allCategories, loadingAllCategories])

  const groupedByParentId = useMemo(
    () => !loadingAllCategories && _.groupBy(subcategories, 'parentId'),
    [loadingAllCategories, subcategories]
  )

  useEffect(() => {
    if (
      selectedCategory &&
      groupedByParentId &&
      Object.keys(groupedByParentId)?.length
    ) {
      const selectedCategoryId = selectedCategory?._id

      setSubcategories(groupedByParentId?.[selectedCategoryId])
    }
  }, [selectedCategory, groupedByParentId])

  return {
    topLevelCategories,
    subcategories,
    groupedByParentId,
    loading: loadingAllCategories,
    handleSelectCategory,
    isRoot,
    selectedCategory,
    handleGoBack
  }
}
export default useGetGroupedCategories
