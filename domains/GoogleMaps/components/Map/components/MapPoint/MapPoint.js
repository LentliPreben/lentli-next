import { MarkerF } from '@react-google-maps/api'
import PropTypes from 'prop-types'

const MapPoint = ({ position }) => {
  if (!position) return null

  return (
    <MarkerF
      position={position}
      icon={{
        url: 'assets/map/point.png',
        scaledSize: new window.google.maps.Size(16, 16),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15)
      }}
    />
  )
}

MapPoint.propTypes = {
  position: PropTypes.object
}

export default MapPoint
