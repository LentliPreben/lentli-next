import { Checkbox, Space } from 'antd'
import { useMemo, memo } from 'react'
import { useSubfilterActions } from 'hooks'
import { useTranslations, useFilterContext } from 'contexts'
import { COLLECTIONS } from '__constants__'
import PropTypes from 'prop-types'
import { LoadingBox, Text } from 'components'
import { StyledCollapse } from 'components/elements/Filter/Filter.styled'
import { useGetDocumentsByIds } from 'services/api/firebase'

const BrandFilter = () => {
  const { getFieldFacets, setFilterParams, filterParams } = useFilterContext()
  const { t } = useTranslations()

  const facets = useMemo(() => getFieldFacets('brandId'), [getFieldFacets])
  const facetsIds = useMemo(() => facets?.map(({ value }) => value), [facets])

  const brandsParams = useMemo(
    () => ({ collection: COLLECTIONS.BRANDS, ids: facetsIds }),
    [facetsIds]
  )

  const [brands, brandsLoading] = useGetDocumentsByIds(brandsParams)

  const { onChange, checkIsEnabled } = useSubfilterActions({
    filterParams: filterParams,
    setFilterParams: setFilterParams,
    fieldName: 'brandId',
    operand: 'array-contains'
  })

  if (!brands?.length) return null

  return (
    <LoadingBox loading={brandsLoading}>
      <StyledCollapse ghost defaultActiveKey="brands">
        <StyledCollapse.Panel header={t('Brands')} key="brands">
          {brands?.map((brand, index) => (
            <div
              key={`status-${index}`}
              className="flex justify-between align-center">
              <Space>
                <Checkbox
                  key={`status-${index}`}
                  checked={checkIsEnabled(brand)}
                  onChange={() => onChange(brand)}
                />
                <Text className="break-all">
                  {brand?.name || t('Unnamed filter')}
                </Text>
              </Space>
              <Text secondary>
                {facets?.find(({ value }) => value === brand?._id)?.count}
              </Text>
            </div>
          ))}
        </StyledCollapse.Panel>
      </StyledCollapse>
    </LoadingBox>
  )
}

BrandFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  categoryId: PropTypes.string
}

export default memo(BrandFilter)
