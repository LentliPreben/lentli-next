import { useFilterContext, useTranslations } from 'contexts'

import { CategoryFilter } from 'domains/Category/components'
import { DestinationFilter } from 'domains/Destination/components'
import { Filter } from 'components'
import { PriceFilter } from 'domains/Price/components'
import { ProductFilterList } from 'domains/Product/components/ProductFilter/components'

const NearByMeFilter = () => {
  const {
    setFilterVisibility,
    setSearchRadius,
    searchRadius,
    filterParams,
    setFilterParams,
    priceRangeNearByMe,
    loadingSearchNearProducts
  } = useFilterContext()

  const { t } = useTranslations()

  return (
    <Filter
      filterVisibility
      setFilterVisibility={setFilterVisibility}
      title={t('Filter')}
      noShadow
      transparent
      loading={loadingSearchNearProducts}>
      <ProductFilterList
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <DestinationFilter
        setSearchRadius={setSearchRadius}
        searchRadius={searchRadius}
        setFilterParams={setFilterParams}
        filterParams={filterParams}
      />
      <PriceFilter priceRange={priceRangeNearByMe} />
      <CategoryFilter />
    </Filter>
  )
}

export default NearByMeFilter
