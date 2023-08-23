import { CurrentLocationButton, MapCircle, MapPoint } from './components'

import { GoogleMap } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import { LoadingBox } from 'components'
import { useInitializeMap } from 'domains/GoogleMaps/hooks'

const initialValue = { lat: 59.9138688, lng: 10.7522454 }

const Map = (props) => {
  const {
    disabled,
    onChange,
    value,
    options,
    children,
    containerStyle,
    markers,
    circleRadius,
    ...rest
  } = props

  const { isLoaded } = useInitializeMap()

  const handleClick = (e) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    onChange?.(latLng)
  }

  return (
    <LoadingBox loading={!isLoaded}>
      <div className="flex flex-col full-height full-width relative">
        <GoogleMap
          zoom={13}
          language="en"
          center={value || initialValue}
          options={options}
          mapContainerClassName="map-container"
          onClick={!disabled && handleClick}
          {...rest}>
          {value && <MapPoint position={value} />}
          {circleRadius && (
            <MapCircle value={value} circleRadius={circleRadius} />
          )}
          {markers}
        </GoogleMap>
        {options.currentLocation === false ? null : (
          <CurrentLocationButton onChange={onChange} />
        )}
        {children}
      </div>
    </LoadingBox>
  )
}

Map.propTypes = {
  children: PropTypes.node,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.object,
  markers: PropTypes.object,
  circleRadius: PropTypes.number
}

export default Map
