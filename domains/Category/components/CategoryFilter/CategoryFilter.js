import { useFilterContext, useTranslations } from 'contexts'
import { TopCategoryWithSubcategoriesCollapse } from './components'
import { memo } from 'react'
import { useGetGroupedCategories } from 'domains/Category/hooks'
import { useSubfilterActions } from 'hooks'
import { Collapse } from 'components'

const CategoryFilter = () => {
  const { setFilterParams, filterParams } = useFilterContext()
  const { t } = useTranslations()

  const { topLevelCategories, groupedByParentId } = useGetGroupedCategories({})

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams: filterParams,
    setFilterParams: setFilterParams,
    fieldName: 'subcategoryId',
    operand: 'array-contains'
  })

  if (!topLevelCategories?.length) return null

  return (
    <Collapse name={t('Categories')} id="categories">
      <div className="flex flex-col mx-12 gap-32">
        <TopCategoryWithSubcategoriesCollapse
          topLevelCategories={topLevelCategories}
          groupedByParentId={groupedByParentId}
          onChange={onChange}
          checkIsEnabled={checkIsEnabled}
        />
      </div>
    </Collapse>
  )
}

export default memo(CategoryFilter)
