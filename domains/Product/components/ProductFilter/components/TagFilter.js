import { Checkbox, Space } from 'antd'
import { useSubfilterActions } from 'hooks'
import { useTranslations } from 'contexts'

import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { useGetTags } from 'domains/Tag/hooks'
import { Text } from 'components'

const TagFilter = ({ filterParams, setFilterParams }) => {
  const [tags] = useGetTags()
  const { t } = useTranslations()

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams,
    setFilterParams,
    fieldName: 'tags',
    operand: 'array-contains'
  })
  const numberOfItemsByFilter = 2
  return (
    <StyledCollapse ghost>
      <StyledCollapse.Panel header={t('Tag')}>
        {tags?.map((tag, index) => (
          <div
            key={`status-${index}`}
            className="flex justify-between align-center">
            <Text className="break-all">
              {tag?.name || t('Unnamed filter')}
            </Text>
            <Space>
              <Text secondary>({numberOfItemsByFilter})</Text>
              <Checkbox
                key={`status-${index}`}
                checked={checkIsEnabled(tag)}
                onChange={() => onChange(tag)}
              />
            </Space>
          </div>
        ))}
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}

TagFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func
}

export default TagFilter
