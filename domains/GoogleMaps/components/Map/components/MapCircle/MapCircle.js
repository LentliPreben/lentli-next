import { CircleF } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import { theme } from 'antd'

const MapCircle = ({ value, circleRadius, ...props }) => {
  const {
    token: { colorPrimary, colorPrimaryBgHover }
  } = theme.useToken()

  return (
    <CircleF
      center={value}
      radius={circleRadius}
      options={{
        strokeColor: colorPrimary,
        strokeWeight: 1,
        fillColor: colorPrimaryBgHover,
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
