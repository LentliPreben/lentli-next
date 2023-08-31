import { useMemo, memo } from 'react'
import { useSubfilterActions } from 'hooks'
import { useTranslations, useFilterContext } from 'contexts'
import { COLLECTIONS } from '__constants__'
import PropTypes from 'prop-types'
import { LoadingBox, Collapse, CheckboxGroup } from 'components'
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

  const getCount = (brand) =>
    facets?.find(({ value }) => value === brand?._id)?.count

  return (
    <LoadingBox loading={brandsLoading}>
      <Collapse name={t('Brands')} id="brands">
        <CheckboxGroup
          options={brands}
          onChange={onChange}
          getCount={getCount}
          checkIsEnabled={checkIsEnabled}
        />
      </Collapse>
    </LoadingBox>
  )
}

BrandFilter.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  categoryId: PropTypes.string
}

export default memo(BrandFilter)
