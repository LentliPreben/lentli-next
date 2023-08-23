import { Form, theme } from 'antd'
import { Map, PlacesAutocomplete } from 'domains/GoogleMaps/components'
import { useMemo, useState } from 'react'
import { useScreen } from 'hooks'
import { useTranslations } from 'contexts'
import { LocationInputWrapper } from './LocationForm.styled'
import PropTypes from 'prop-types'

const NEXT_PUBLIC_GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

const LocationForm = (props) => {
  const { initialValues, group, onAddressChange, disabled } = props

  const computedLatLng = useMemo(() => {
    const latitude = initialValues?.latitude
    const longitude = initialValues?.longitude
    return latitude && longitude ? { lat: latitude, lng: longitude } : null
  }, [initialValues?.latitude, initialValues?.longitude])

  const [latLng, setLatLng] = useState(computedLatLng)

  const { t } = useTranslations()
  const { xs } = useScreen()
  const {
    token: { borderRadiusLG }
  } = theme.useToken()

  const getFieldName = (subGroup) => (group ? [...group, subGroup] : [subGroup])

  return (
    <div className="full-height">
      <Map
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          mapId: NEXT_PUBLIC_GOOGLE_MAP_ID
        }}
        mapContainerStyle={{
          borderRadius: borderRadiusLG,
          minHeight: '50vh',
          height: '100%'
        }}
        onChange={setLatLng}
        disabled={disabled}
        value={latLng}>
        <LocationInputWrapper xs={xs}>
          <Form.Item
            rules={[
              {
                required: true,
                message: t('Please select location on input on map')
              }
            ]}
            name={getFieldName('locationData')}>
            <PlacesAutocomplete
              {...props}
              size={xs ? 'large' : 'middle'}
              latLng={latLng}
              setLatLng={setLatLng}
              onAddressChange={onAddressChange}
            />
          </Form.Item>
        </LocationInputWrapper>
      </Map>
    </div>
  )
}

LocationForm.propTypes = {
  initialValues: PropTypes.object,
  form: PropTypes.object,
  group: PropTypes.array,
  exclude: PropTypes.array,
  withAddressSelect: PropTypes.bool,
  onAddressChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default LocationForm
