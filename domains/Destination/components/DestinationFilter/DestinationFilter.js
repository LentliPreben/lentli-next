import { memo, useMemo } from 'react'

import { Collapse, Slider } from 'components'
import PropTypes from 'prop-types'
import { useSubfilterActions } from 'hooks'
import { useTranslations } from 'contexts'

const DestinationFilter = (props) => {
  const { setFilterParams, filterParams, setSearchRadius, searchRadius } = props
  const { t } = useTranslations()

  const subfilterOptions = useMemo(
    () => ({
      filterParams,
      setFilterParams,
      fieldName: 'address.location',
      operand: 'slider'
    }),
    [filterParams, setFilterParams]
  )

  const { onChange } = useSubfilterActions(subfilterOptions)
  const handleSliderChange = (value) => {
    setSearchRadius(value * 1000)
    onChange(value * 1000)
  }

  const marks = {
    1: 1,
    50: 50,
    100: 100
  }
  return (
    <Collapse id="destination" name={t('Destination, km')}>
      <Slider
        min={1}
        max={100}
        step={1}
        value={searchRadius / 1000}
        onChange={handleSliderChange}
        marks={marks}
      />
    </Collapse>
  )
}
DestinationFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  setSearchRadius: PropTypes.func,
  searchRadius: PropTypes.number
}

export default memo(DestinationFilter)
