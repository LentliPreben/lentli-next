import { useEffect, useMemo } from 'react'
import {
  useGetGeocode,
  useGetPlacesAutocompleteBaseHandlers
} from 'domains/GoogleMaps/hooks'

import { PropTypes } from 'prop-types'
import { Select } from 'antd'
import usePlacesAutocomplete from 'use-places-autocomplete'
import { useTranslations } from 'contexts'

const PlacesAutocomplete = (props) => {
  const { onChange, latLng, setLatLng, disabled, onAddressChange, size } = props
  const { t } = useTranslations()

  const placesAutocompleteProps = {
    debounce: 300,
    requestOptions: {
      language: 'en'
    }
  }

  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete(placesAutocompleteProps)

  const getLatLngGeocode = useGetGeocode({
    latLng,
    setValue,
    onChange,
    onAddressChange
  })

  useEffect(() => {
    latLng && getLatLngGeocode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latLng])

  // Update the keyword of the input element
  const { handleSearch, handleSelect } = useGetPlacesAutocompleteBaseHandlers({
    clearSuggestions,
    setLatLng,
    setValue,
    data
  })

  const computedOptions = useMemo(
    () =>
      status === 'OK' &&
      data?.map(({ place_id, description }) => ({
        key: place_id,
        value: place_id,
        label: description
      })),
    [data, status]
  )

  const selectProps = {
    style: { width: '100%' },
    onSearch: disabled ? null : handleSearch,
    onSelect: disabled ? null : handleSelect,
    filterOption: false,
    placeholder: t('Search for a place...'),
    value: value || null,
    showSearch: true,
    showArrow: false,
    size
  }

  return (
    /* We can use the "status" to decide whether we should display the dropdown or not */
    <Select {...selectProps} options={computedOptions} />
  )
}

PlacesAutocomplete.propTypes = {
  onChange: PropTypes.func,
  latLng: PropTypes.object,
  setLatLng: PropTypes.func,
  onAddressChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string
}

export default PlacesAutocomplete
