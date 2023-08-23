import { Checkbox, Space, Typography } from 'antd'
import { useSubfilterActions } from 'hooks'
import { useTranslations } from 'contexts'

import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { useGetTags } from 'domains/Tag/hooks'

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
            <Typography.Text wordBreak="break-all">
              {tag?.name || t('Unnamed filter')}
            </Typography.Text>
            <Space>
              <Typography.Text type="secondary">
                ({numberOfItemsByFilter})
              </Typography.Text>
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
