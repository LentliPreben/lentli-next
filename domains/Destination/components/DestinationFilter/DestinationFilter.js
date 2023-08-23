import { Slider } from 'antd'
import { memo, useMemo } from 'react'
import { useSubfilterActions } from 'hooks'
import { useTranslations } from 'contexts'
import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'

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
    5: 5,
    10: 10
  }
  return (
    <StyledCollapse ghost defaultActiveKey="price">
      <StyledCollapse.Panel
        header={t('Destination, km')}
        key="price"
        forceRender>
        <div className="mx-4">
          <Slider
            min={1}
            max={10}
            step={1}
            value={searchRadius / 1000}
            onChange={handleSliderChange}
            marks={marks}
          />
        </div>
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}
DestinationFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  setSearchRadius: PropTypes.func,
  searchRadius: PropTypes.number
}

export default memo(DestinationFilter)
