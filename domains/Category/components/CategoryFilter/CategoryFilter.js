import { Checkbox, Space } from 'antd'
import { collection, query, where } from 'firebase/firestore'
import { useFilterContext, useTranslations } from 'contexts'

import { COLLECTIONS } from '__constants__'
import PropTypes from 'prop-types'
import { Spinner, Text } from 'components'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { firestore } from 'services/firebase'
import { memo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSubfilterActions } from 'hooks'

const CategoryFilter = () => {
  const { setFilterParams, filterParams } = useFilterContext()
  const { t } = useTranslations()

  const [subcategories, subcategoriesLoading] = useCollectionData(
    query(
      collection(firestore, COLLECTIONS.CATEGORIES),
      where('isTopLevel', '==', false)
    )
  )

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams: filterParams,
    setFilterParams: setFilterParams,
    fieldName: 'subcategoryId',
    operand: 'array-contains'
  })

  if (!subcategories?.length) return null

  return !subcategoriesLoading ? (
    <StyledCollapse ghost defaultActiveKey="categories">
      <StyledCollapse.Panel header={t('Categories')} key="categories">
        {subcategories?.map((category, index) => (
          <div
            key={`status-${index}`}
            className="flex justify-between align-center">
            <Space>
              <Checkbox
                key={`status-${index}`}
                checked={checkIsEnabled(category)}
                onChange={() => onChange(category)}
              />
              <Text className="break-all">
                {category?.name || t('Unnamed filter')}
              </Text>
            </Space>
          </div>
        ))}
      </StyledCollapse.Panel>
    </StyledCollapse>
  ) : (
    <Spinner />
  )
}

CategoryFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  categoryId: PropTypes.string
}

export default memo(CategoryFilter)
