import { BrandFilter, FieldFilter, ProductFilterList } from './components'
import { memo, useMemo } from 'react'

import { COLLECTIONS } from '__constants__'
import { Filter } from 'components'
import PropTypes from 'prop-types'
import { useFilterContext, useTranslations } from 'contexts'
import { useGetDocumentsByIds } from 'services/api/firebase'
import { PriceFilter } from 'domains/Price/components'

const ProductFilter = (props) => {
  const { filterVisibility, setFilterVisibility, category } = props
  const {
    getFieldFacets,
    setFilterParams,
    filterParams,
    priceRangeByCategory
  } = useFilterContext()

  const { t } = useTranslations()
  const facets = useMemo(() => getFieldFacets('brandId'), [getFieldFacets])
  const facetsIds = useMemo(() => facets?.map(({ value }) => value), [facets])
  const brandsParams = useMemo(
    () => ({ collection: COLLECTIONS.BRANDS, ids: facetsIds }),
    [facetsIds]
  )
  const [brands, brandsLoading] = useGetDocumentsByIds(brandsParams)

  return (
    <Filter
      filterVisibility={filterVisibility}
      setFilterVisibility={setFilterVisibility}
      title={t('Filter')}
      noShadow
      transparent>
      <ProductFilterList
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        brands={brands}
        brandsLoading={brandsLoading}
      />
      {facetsIds?.length ? (
        <PriceFilter
          categoryId={category?._id}
          priceRange={priceRangeByCategory}
        />
      ) : null}
      <BrandFilter categoryId={category?._id} />
      {category?.fields?.map(({ name }) => (
        <FieldFilter key={name} field={name} />
      ))}
    </Filter>
  )
}

ProductFilter.propTypes = {
  filterVisibility: PropTypes.bool,
  setFilterVisibility: PropTypes.func,
  category: PropTypes.object
}

export default memo(ProductFilter)
