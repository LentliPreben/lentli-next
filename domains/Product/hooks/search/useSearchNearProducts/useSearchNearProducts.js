import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHandleError, useStateWithStorage } from 'hooks'

import { COLLECTIONS } from '__constants__'
import { getDocuments } from 'modules/typesense-module/helpers'

const useSearchNearProducts = (
  radius = 15000,
  filterParams,
  selectedLocation
) => {
  const [loading, setLoading] = useState()

  const searchRadius = useMemo(() => radius / 1000 + 'km', [radius])
  const handleError = useHandleError()
  const pricePerDay = filterParams?.pricePerDay

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
          q: '*',
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
    [handleError, location]
  )

  useEffect(() => {
    selectedLocation &&
      searchProducts(
        `address.location:(${location}, ${searchRadius})`,
        setAllNearByProducts
      )
  }, [location, selectedLocation, searchRadius, handleError, searchProducts])

  useEffect(() => {
    if (pricePerDay) {
      searchProducts(
        `address.location:(${location}, ${searchRadius}) && pricePerDay: [${pricePerDay}]`,
        setFilteredNearByProducts
      )
    } else {
      setFilteredNearByProducts(allNearByProducts)
    }
  }, [location, pricePerDay, searchProducts, searchRadius, allNearByProducts])

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
