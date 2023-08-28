import { Radio, Space } from 'antd'
import { useSubfilterActions } from 'hooks'
import { useTranslations } from 'contexts'

import PropTypes from 'prop-types'
import { RateSelect, Text } from 'components'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'

const ReviewFilter = ({ filterParams, setFilterParams, value = 0 }) => {
  const { t } = useTranslations()

  const { onChange } = useSubfilterActions({
    filterParams,
    setFilterParams,
    fieldName: 'reviews',
    operand: 'array-contains'
  })

  const options = [{ value: 3 }, { value: 4 }, { value: 5 }]

  return (
    <StyledCollapse ghost>
      <StyledCollapse.Panel header={t('Review')}>
        <Radio.Group onChange={onChange} value={value} className="full-width">
          {options?.map((item, index) => (
            <div
              key={`${index}-radio-review-item`}
              className="flex justify-between align-center">
              <Space>
                <RateSelect value={item.value} size="md" disabled />
                <Text secondary>&{t('up')}</Text>
              </Space>
              <Radio className="mr-0" />
            </div>
          ))}
        </Radio.Group>
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}

ReviewFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  value: PropTypes.bool
}

export default ReviewFilter
