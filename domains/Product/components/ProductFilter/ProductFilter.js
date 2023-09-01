import { BrandFilter, FieldFilter, ProductFilterList } from './components'
import { memo, useMemo } from 'react'
import { useFilterContext, useTranslations } from 'contexts'

import { COLLECTIONS } from '__constants__'
import { Filter } from 'components'
import { PriceFilter } from 'domains/Price/components'
import PropTypes from 'prop-types'
import { useGetDocumentsByIds } from 'services/api/firebase'

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

      <PriceFilter
        categoryId={category?._id}
        priceRange={priceRangeByCategory}
      />

      {/* <BrandFilter categoryId={category?._id} /> */}
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
