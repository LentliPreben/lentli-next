import { Checkbox, Space, Typography } from 'antd'
import { useSubfilterActions } from 'hooks'

import PropTypes from 'prop-types'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { useGetAddresses } from 'domains/Address/hooks'
import { useTranslations } from 'contexts'

const AddressFilter = ({ filterParams, setFilterParams }) => {
  const [addresses] = useGetAddresses({})
  const { t } = useTranslations()

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams,
    setFilterParams,
    fieldName: 'address',
    operand: '=='
  })

  const numberOfItemsByFilter = 21

  return (
    <StyledCollapse ghost>
      <StyledCollapse.Panel header={t('Address')}>
        {addresses?.map((address, index) => (
          <div
            key={`status-${index}`}
            className="flex justify-between align-center">
            <Typography.Text wordBreak="break-all">
              {address?.city || address?.postalTown || t('Unnamed filter')}
            </Typography.Text>
            <Space>
              <Typography.Text type="secondary">
                ({numberOfItemsByFilter})
              </Typography.Text>
              <Checkbox
                key={`status-${index}`}
                checked={checkIsEnabled(address)}
                onChange={() => onChange(address)}
              />
            </Space>
          </div>
        ))}
      </StyledCollapse.Panel>
    </StyledCollapse>
  )
}

AddressFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func
}

export default AddressFilter
