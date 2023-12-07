import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHandleError, useStateWithStorage } from 'hooks'

import { COLLECTIONS } from '__constants__'
import { getDocuments } from 'modules/typesense-module/helpers'

const useSearchNearProducts = (
  radius = 15000,
  filterParams,
  selectedLocation,
  searchProduct
) => {
  const [loading, setLoading] = useState()

  const searchRadius = useMemo(() => radius / 1000 + 'km', [radius])
  const handleError = useHandleError()
  const pricePerDayWithFees = filterParams?.pricePerDayWithFees

  const [allNearByProducts, setAllNearByProducts] = useState([])
  const [filteredNearByProducts, setFilteredNearByProducts] = useState([])
  const location = useMemo(
    () => Number(selectedLocation?.lat) + ', ' + Number(selectedLocation?.lng),
    [selectedLocation]
  )

  const searchProducts = useCallback(
    async (filterBy, callback) => {
      try {
        setLoading(true)
        const { documents } = await getDocuments(COLLECTIONS.PRODUCTS, {
          q: searchProduct ? searchProduct : '*',
          query_by: 'name',
          filter_by: filterBy,
          sort_by: `address.location(${location}):asc`,
          per_page: 100
        })

        callback?.(documents)
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false)
      }
    },
    [handleError, location, searchProduct]
  )

  useEffect(() => {
    selectedLocation &&
      searchProducts(
        `address.location:(${location}, ${searchRadius})`,
        setAllNearByProducts
      )
  }, [location, selectedLocation, searchRadius, handleError, searchProducts])

  const formattedIds = filterParams?.subcategoryId?.join(', ')

  const filteredProductsConditions = useMemo(
    () => ({
      PriceAndSubcategory:
        formattedIds && pricePerDayWithFees
          ? `address.location:(${location}, ${searchRadius}) && pricePerDayWithFees: [${pricePerDayWithFees}] && categoryId: [${formattedIds}]`
          : null,
      OnlyPrice:
        pricePerDayWithFees && !formattedIds
          ? `address.location:(${location}, ${searchRadius}) && pricePerDayWithFees: [${pricePerDayWithFees}]`
          : null,
      OnlySubcategory:
        !pricePerDayWithFees && formattedIds
          ? `address.location:(${location}, ${searchRadius}) && categoryId: [${formattedIds}]`
          : null
    }),
    [formattedIds, location, pricePerDayWithFees, searchRadius]
  )

  useEffect(() => {
    const filterType =
      pricePerDayWithFees && formattedIds
        ? 'PriceAndSubcategory'
        : pricePerDayWithFees && !formattedIds
        ? 'OnlyPrice'
        : !pricePerDayWithFees && formattedIds
        ? 'OnlySubcategory'
        : null

    const filterCondition = filteredProductsConditions[filterType]

    if (filterCondition) {
      searchProducts(filterCondition, setFilteredNearByProducts)
    } else {
      setFilteredNearByProducts(allNearByProducts)
    }
  }, [
    location,
    pricePerDayWithFees,
    searchProducts,
    searchRadius,
    allNearByProducts,
    formattedIds,
    filteredProductsConditions
  ])

  return useMemo(
    () => ({
      allNearByProducts,
      filteredNearByProducts,
      loading
    }),
    [allNearByProducts, filteredNearByProducts, loading]
  )
}

export default useSearchNearProducts
