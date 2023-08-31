import { memo, useMemo } from 'react'
import { useSubfilterActions } from 'hooks'
import { useTranslations, useFilterContext } from 'contexts'
import PropTypes from 'prop-types'
import { Text, Collapse, CheckboxGroup } from 'components'

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

  const handleChange = ({ value }) => onChange(value)
  const handleCheckIsEnabled = ({ value }, index) =>
    checkIsEnabled(value, index)

  if (!facets?.length) return null

  return (
    <Collapse name={t(field)} id={field}>
      <CheckboxGroup
        options={facets}
        checkIsEnabled={handleCheckIsEnabled}
        onChange={handleChange}
      />
    </Collapse>
  )
}

FieldFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  options: PropTypes.array,
  field: PropTypes.string
}

export default memo(FieldFilter)
