import { CheckboxGroup, Collapse, Text } from 'components'

import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'

const TopCategoryWithSubcategoriesCollapse = (props) => {
  const { topLevelCategories, categories, checkIsEnabled, onChange } = props

  const { t } = useTranslations()

  const getTopCategorySubCategories = (topCategoryId) => {
    return categories?.filter(
      (category) => category?.parentId === topCategoryId
    )
  }

  return topLevelCategories?.map((topCategory) => {
    return (
      <Collapse
        className="mb-4 mx-12 gap-24"
        name={topCategory?.name}
        id={topCategory?.name}
        key={topCategory?.name}>
        {categories?.length ? (
          <CheckboxGroup
            onChange={onChange}
            options={getTopCategorySubCategories(topCategory?._id)}
            checkIsEnabled={checkIsEnabled}
          />
        ) : (
          <Text secondary>{t('No subcategories')}</Text>
        )}
      </Collapse>
    )
  })
}

TopCategoryWithSubcategoriesCollapse.propTypes = {
  topLevelCategories: PropTypes.array,
  groupedByParentId: PropTypes.object,
  checkIsEnabled: PropTypes.func,
  onChange: PropTypes.func
}

export default TopCategoryWithSubcategoriesCollapse
