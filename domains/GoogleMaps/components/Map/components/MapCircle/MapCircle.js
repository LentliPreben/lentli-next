import { CircleF } from '@react-google-maps/api'
import PropTypes from 'prop-types'

const MapCircle = ({ value, circleRadius, ...props }) => {
  return (
    <CircleF
      center={value}
      radius={circleRadius}
      options={{
        strokeColor: '#1c74e0',
        strokeWeight: 1,
        fillColor: '#c4e7ff',
        clickable: false,
        editable: false
      }}
      {...props}
    />
  )
}

MapCircle.propTypes = {
  value: PropTypes.object,
  circleRadius: PropTypes.number
}

export default MapCircle
