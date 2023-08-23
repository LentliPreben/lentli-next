import { Checkbox, Space, Typography } from 'antd'
import { useSubfilterActions } from 'hooks'
import { useTranslations } from 'contexts'
import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { useGetCancellationTerms } from 'domains/CancellationTerm/hooks'

const CancellationTermFilter = ({ filterParams, setFilterParams }) => {
  const [cancellationTerms] = useGetCancellationTerms()
  const { t } = useTranslations()

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams,
    setFilterParams,
    fieldName: 'cancellationTerms',
    operand: 'array-contains'
  })
  const numberOfItemsByFilter = 16

  return (
    <StyledCollapse ghost>
      <StyledCollapse.Panel header={t('Cancellation term')}>
        {cancellationTerms?.map((cancellationTerm, index) => (
          <div
            key={`status-${index}`}
            className="flex justify-between align-center">
            <Typography.Text wordBreak="break-all">
              {cancellationTerm?.title || t('Unnamed filter')}
            </Typography.Text>
            <Space>
              <Typography.Text type="secondary">
                ({numberOfItemsByFilter})
              </Typography.Text>
              <Checkbox
                key={`status-${index}`}
                checked={checkIsEnabled(cancellationTerm)}
                onChange={() => onChange(cancellationTerm)}
              />
            </Space>
          </div>
        ))}
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}

CancellationTermFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func
}

export default CancellationTermFilter
