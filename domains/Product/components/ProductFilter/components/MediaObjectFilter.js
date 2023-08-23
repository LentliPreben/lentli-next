import { Checkbox, Typography } from 'antd'
import { useSubfilterActions } from 'hooks'
import { useTranslations } from 'contexts'

import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { useGetMediaObject } from 'domains/MediaObject/hooks'

const MediaObjectFilter = ({ filterParams, setFilterParams }) => {
  const [mediaObjects] = useGetMediaObject()
  const { t } = useTranslations()

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams,
    setFilterParams,
    fieldName: 'mediaObjects',
    operand: 'array-contains'
  })

  return (
    <StyledCollapse ghost>
      <StyledCollapse.Panel header={t('Media object')}>
        {mediaObjects?.map((mediaObject, index) => (
          <div key={`status-${index}`}>
            <Checkbox
              key={`status-${index}`}
              checked={checkIsEnabled(mediaObject)}
              onChange={() => onChange(mediaObject)}>
              <Typography.Text wordBreak="break-all">
                {mediaObject?.fileName || t('Unnamed filter')}
              </Typography.Text>
            </Checkbox>
          </div>
        ))}
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}

MediaObjectFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func
}

export default MediaObjectFilter