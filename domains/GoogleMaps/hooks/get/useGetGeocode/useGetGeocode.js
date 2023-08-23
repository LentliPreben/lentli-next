import { ADDRESS_FIELDS } from '__constants__'
import { getGeocode } from 'use-places-autocomplete'
import { useCallback } from 'react'

const useGetGeocode = ({ latLng, setValue, onChange, onAddressChange }) => {
  const getAddressAdditionalData = (addressComponents) => {
    const fieldsValue = addressComponents?.map(({ types, long_name }) => {
      const findType = ADDRESS_FIELDS.find(({ type }) => type === types[0])
      return findType ? { [findType?.field]: long_name } : null
    })
    return Object.assign({}, ...(fieldsValue || []))
  }

  const getGeocodeSuccessCallback = useCallback(
    (results) => {
      const place = results?.[0]
      const additionalData = getAddressAdditionalData(place.address_components)

      const data = {
        placeId: place.place_id ?? null,
        latitude: latLng?.lat ?? null,
        longitude: latLng?.lng ?? null,
        ...additionalData
      }

      onChange?.(data)
      setValue?.(place.formatted_address)
      onAddressChange?.({ addressStr: place.formatted_address, address: data })
    },
    [latLng?.lat, latLng?.lng, onAddressChange, onChange, setValue]
  )

  const getGeocodeErrorCallback = useCallback(
    // eslint-disable-next-line no-console
    (error) => console.error('Geocode error', error),
    []
  )

  return useCallback(() => {
    getGeocode({
      location: latLng,
      language: 'en'
    })
      .then(getGeocodeSuccessCallback)
      .catch(getGeocodeErrorCallback)
  }, [latLng, getGeocodeErrorCallback, getGeocodeSuccessCallback])
}

export default useGetGeocode
