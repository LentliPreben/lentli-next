import { Button, Input, Slider, Typography } from 'antd'
import { memo, useEffect, useMemo, useState } from 'react'
import { useSubfilterActions } from 'hooks'

import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { useFilterContext, useTranslations } from 'contexts'

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
    if (!filterParams?.pricePerDay) {
      setMinValue(minPrice)
      setMaxValue(maxPrice)
    }
  }, [minPrice, maxPrice, filterParams?.pricePerDay])

  const subfilterOptions = useMemo(
    () => ({
      filterParams,
      setFilterParams,
      fieldName: 'pricePerDay',
      operand: 'range'
    }),
    [filterParams, setFilterParams]
  )

  const { onChange } = useSubfilterActions(subfilterOptions)

  return (
    <StyledCollapse ghost defaultActiveKey="price">
      <StyledCollapse.Panel header={t('Price')} key="price" forceRender>
        <div className="mx-4">
          <div className="flex gap-4 align-center">
            <Input
              value={minValue}
              onChange={(e) => handleInputChange(e.target.value, 'min')}
            />
            <Typography.Text type="secondary">-</Typography.Text>
            <Input
              className="mr-4"
              value={maxValue}
              onChange={(e) => handleInputChange(e.target.value, 'max')}
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
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}
PriceFilter.propTypes = {
  priceRange: PropTypes.object
}

export default memo(PriceFilter)
