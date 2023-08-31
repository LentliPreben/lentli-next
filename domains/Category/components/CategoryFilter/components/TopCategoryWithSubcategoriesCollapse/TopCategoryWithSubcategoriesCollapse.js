import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'
import { Collapse, Text, CheckboxGroup } from 'components'

const TopCategoryWithSubcategoriesCollapse = (props) => {
  const { topLevelCategories, groupedByParentId, checkIsEnabled, onChange } =
    props

  const { t } = useTranslations()

  return topLevelCategories?.map((topCategory) => {
    return (
      <Collapse
        className="mb-4 mx-12 gap-24"
        name={topCategory?.name}
        id={topCategory?.name}
        key={topCategory?.name}>
        {groupedByParentId?.[topCategory?._id]?.length ? (
          <CheckboxGroup
            onChange={onChange}
            options={groupedByParentId?.[topCategory?._id]}
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
