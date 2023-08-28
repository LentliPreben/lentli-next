import { Checkbox, Space } from 'antd'
import { memo, useMemo } from 'react'
import { useSubfilterActions } from 'hooks'
import { useTranslations, useFilterContext } from 'contexts'
import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { Text } from 'components'

const FieldFilter = ({ field }) => {
  const { t } = useTranslations()

  const { getFieldFacets, setFilterParams, filterParams } = useFilterContext()

  const facets = useMemo(
    () => getFieldFacets(`fields.${field}`),
    [getFieldFacets, field]
  )

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams: filterParams,
    setFilterParams: setFilterParams,
    fieldName: `fields.${field}`,
    operand: 'object-has',
    isField: true
  })

  if (!facets?.length) return null

  return (
    <StyledCollapse ghost activeKey="fields">
      <StyledCollapse.Panel header={t(field)} key="fields">
        {facets?.map(({ value, count }, index) => (
          <div
            key={`status-${index}`}
            className="flex justify-between align-center">
            <Space>
              <Checkbox
                key={`status-${index}`}
                checked={checkIsEnabled(value, index)}
                onChange={() => onChange(value)}
              />
              <Text className="break-all">{value || t('Unnamed filter')}</Text>
            </Space>
            <Text secondary>{count}</Text>
          </div>
        ))}
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}

FieldFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  options: PropTypes.array,
  field: PropTypes.string
}

export default memo(FieldFilter)
