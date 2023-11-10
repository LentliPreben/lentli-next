import { Collapse, Spinner } from 'components'
import { useFilterContext, useTranslations } from 'contexts'

import { TopCategoryWithSubcategoriesCollapse } from './components'
import { memo } from 'react'
import { useGetTopLevelCategories } from 'domains/Category/hooks'
import { useSubfilterActions } from 'hooks'

const CategoryFilter = () => {
  const { setFilterParams, filterParams } = useFilterContext()
  const { t } = useTranslations()

  const { topLevelCategories, filteredCategories, subCategories, loading } =
    useGetTopLevelCategories()

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams: filterParams,
    setFilterParams: setFilterParams,
    fieldName: 'subcategoryId',
    operand: 'array-contains'
  })

  if (!topLevelCategories?.length) return null

  return !loading ? (
    <Collapse name={t('Categories')} id="categories">
      <div className="flex flex-col mx-12 gap-24">
        <TopCategoryWithSubcategoriesCollapse
          topLevelCategories={topLevelCategories}
          categories={filteredCategories}
          onChange={onChange}
          checkIsEnabled={checkIsEnabled}
        />
      </div>
    </Collapse>
  ) : (
    <Spinner />
  )
}

export default memo(CategoryFilter)
