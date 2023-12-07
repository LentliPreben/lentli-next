import { memo, useEffect, useMemo, useState } from 'react'
import { useSubfilterActions } from 'hooks'

import PropTypes from 'prop-types'
import { useFilterContext, useTranslations } from 'contexts'
import { Text, Button, Collapse, Input, Slider } from 'components'

const PriceFilter = ({ priceRange }) => {
  const { setFilterParams, filterParams } = useFilterContext()
  const { t } = useTranslations()

  const { minPrice, maxPrice } = priceRange

  const [minValue, setMinValue] = useState(minPrice)
  const [maxValue, setMaxValue] = useState(maxPrice)
  const [disabled, setDisabled] = useState(true)

  const handleInputChange = (value, type) => {
    setDisabled(false)
    if (type === 'min') {
      setMinValue(value)
    } else if (type === 'max') {
      setMaxValue(value)
    }
  }
  const handleInputMinValueChange = (value) => handleInputChange(value, 'min')
  const handleInputMaxValueChange = (value) => handleInputChange(value, 'max')

  const handleSliderChange = (values) => {
    setDisabled(false)
    setMinValue(values[0])
    setMaxValue(values[1])
  }

  const applyChanges = () => {
    const clampedMinValue = Math.max(minValue, minPrice)
    const clampedMaxValue = Math.min(maxValue, maxPrice)
    setMinValue(clampedMinValue)
    setMaxValue(clampedMaxValue)

    onChange([clampedMinValue, clampedMaxValue])
    setDisabled(true)
  }

  useEffect(() => {
    if (!filterParams?.pricePerDayWithFees) {
      setMinValue(minPrice)
      setMaxValue(maxPrice)
    }
  }, [minPrice, maxPrice, filterParams?.pricePerDayWithFees])

  const subfilterOptions = useMemo(
    () => ({
      filterParams,
      setFilterParams,
      fieldName: 'pricePerDayWithFees',
      operand: 'range'
    }),
    [filterParams, setFilterParams]
  )

  const { onChange } = useSubfilterActions(subfilterOptions)

  return (
    <Collapse ghost id="price" name={t('Price')}>
      <div className="mx-4">
        <div className="flex gap-4 align-center mb-8">
          <Input
            size="sm"
            value={minValue}
            onChange={handleInputMinValueChange}
          />
          <Text secondary>-</Text>
          <Input
            size="sm"
            className="mr-4"
            value={maxValue}
            onChange={handleInputMaxValueChange}
          />

          <Button disabled={disabled} onClick={applyChanges}>
            {t('OK')}
          </Button>
        </div>
        <Slider
          min={minPrice}
          max={maxPrice}
          range
          step={1}
          value={[minValue, maxValue]}
          onChange={handleSliderChange}
        />
      </div>
    </Collapse>
  )
}
PriceFilter.propTypes = {
  priceRange: PropTypes.object
}

export default memo(PriceFilter)
