import { getGeocode, getLatLng } from 'use-places-autocomplete'

import { useCallback } from 'react'

const useGetPlacesAutocompleteBaseHandlers = ({
  clearSuggestions,
  setValue,
  setLatLng,
  data
}) => {
  const handleSearch = useCallback((value) => setValue(value), [setValue])

  const handleSelect = useCallback(
    (placeId) => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      const searchValue = data?.find((item) => item?.place_id === placeId)

      const { description } = searchValue

      getGeocode({ address: description }).then((results) => {
        const latLng = getLatLng(results[0])
        setLatLng(latLng)
      })

      setValue(searchValue?.description)
      clearSuggestions()
    },
    [clearSuggestions, setValue, data, setLatLng]
  )

  return { handleSearch, handleSelect }
}

export default useGetPlacesAutocompleteBaseHandlers
