import { useCallback, useMemo } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'

const useLocationSearch = (onAddressChange) => {
  const autocompleteProps = {
    debounce: 300,
    requestOptions: { language: 'en' }
  }

  const {
    setValue,
    suggestions: { data },
    clearSuggestions: onReset
  } = usePlacesAutocomplete(autocompleteProps)

  const onSelect = useCallback(
    (placeId) => {
      if (!placeId) return
      const searchValue = data?.find((item) => item?.place_id === placeId)
      const { description } = searchValue

      getGeocode({ address: description }).then((results) => {
        const latLng = getLatLng(results[0])
        onAddressChange(latLng)
      })
    },
    [data, onAddressChange]
  )

  return useMemo(
    () => ({ data: data || [], onChange: setValue, onReset, onSelect }),
    [onReset, data, setValue, onSelect]
  )
}

export default useLocationSearch
