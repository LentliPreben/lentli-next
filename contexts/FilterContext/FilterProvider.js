import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  useGetProductPriceRangeByCategory,
  useGetProductPriceRangeNearByMe,
  useSearchAllProducts,
  useSearchFacets,
  useSearchNearProducts,
  useSearchProducts,
  useSearchProductsByCategory
} from 'domains/Product/hooks'
import { useLoading, useStateWithStorage } from 'hooks'

import FilterContext from './FilterContext'
import PropTypes from 'prop-types'

const DEFAULT_LOCATION = { lat: 59.9138688, lng: 10.7522454 }

const FilterProvider = ({ children, category }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchRadius, setSearchRadius] = useState()
  const [searchProduct, setSearchProduct] = useState('')

  const [selectedLocation, setSelectedLocation] = useStateWithStorage(
    DEFAULT_LOCATION,
    'selectedLocation'
  )

  const [priceRangeByCategory, loadingPriceRangeByCategory] =
    useGetProductPriceRangeByCategory(category?._id)

  // Prepare parameters to get filter options counts
  const facetsParams = useMemo(() => {
    const fieldsFacet = category?.fields
      ?.map(({ name }) => `fields.${name}`)
      .join(', ')

    return {
      categoryId: category?._id ?? null,
      facet_by: fieldsFacet?.length ? 'brandId, ' + fieldsFacet : 'brandId'
    }
  }, [category])

  // query looks like
  // brandId:[brandId_1, brandId_2] && fields.GPU type:[Integrated] && fields.Ram type:[DDR-3, DDR-4] && pricePerDay:[2..299]
  // Prepare parameters to get products
  const searchParams = useMemo(
    () => ({
      categoryId: category?._id ?? null,
      subCategoryIds: category?.subcategories ?? null,
      perPage: 8,
      page: currentPage
    }),
    [category?._id, category?.subcategories, currentPage]
  )

  // Fetching filter options counts
  const { loading: facetsLoading, facets } = useSearchFacets(facetsParams)
  // Fetching products
  // fetch products by category
  const productsByCategory = useSearchProductsByCategory(searchParams)
  // fetch products by top category
  const productsByTopLevelCategory = useSearchProducts(searchParams)
  const allProducts = useSearchAllProducts(searchParams)

  const topLevelWithSubcategories =
    category?.isTopLevel && category?.subcategories?.length > 0
  const {
    productIds,
    loading: productsLoading,
    setSearchValue,
    filterParams,
    setFilterParams,
    totalResults,
    products
  } = category
    ? topLevelWithSubcategories
      ? productsByTopLevelCategory
      : productsByCategory
    : allProducts

  const {
    allNearByProducts,
    filteredNearByProducts,
    loading: loadingSearchNearProducts
  } = useSearchNearProducts(
    searchRadius,
    filterParams,
    selectedLocation,
    searchProduct
  )

  const priceRangeNearByMe = useGetProductPriceRangeNearByMe(allNearByProducts)

  // ^^ we have 3 posible options to fetch products:
  // 1) all products (allProducts)
  // 2) selected top level category products only (productsByTopLevelCategory)
  // 3) selected subCategory products only (productsByCategory)

  const getFieldFacets = useCallback(
    (fieldName) =>
      facets?.find(({ field_name }) => field_name === fieldName)?.counts || [],
    [facets]
  )

  const loading = useLoading([
    facetsLoading,
    productsLoading,
    loadingPriceRangeByCategory
  ])

  useEffect(() => {
    !filterParams?.['address.location'] && setSearchRadius(5000)
  }, [searchRadius, filterParams])

  return (
    <FilterContext.Provider
      value={{
        loading,
        loadingSearchNearProducts,
        facets,
        productIds,
        setSearchValue,
        filterParams,
        setFilterParams,
        getFieldFacets,
        setCurrentPage,
        currentPage,
        totalResults,
        setSearchRadius,
        searchRadius,
        selectedLocation,
        setSelectedLocation,
        allNearByProducts,
        filteredNearByProducts,
        priceRangeByCategory,
        priceRangeNearByMe,
        products,
        setSearchProduct,
        searchProduct
      }}>
      {children}
    </FilterContext.Provider>
  )
}

FilterProvider.propTypes = {
  children: PropTypes.node,
  category: PropTypes.object
}

export default memo(FilterProvider)
