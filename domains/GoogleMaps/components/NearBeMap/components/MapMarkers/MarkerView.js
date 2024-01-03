import { InfoWindowF, MarkerF } from '@react-google-maps/api'
import { useMemo, useState } from 'react'

import MapProductView from './MapProductView'
import PropTypes from 'prop-types'
import { getIcon } from './helpers'

const MarkerView = (props) => {
  const {
    address,
    _id,
    name,
    pricePerDayWithFees,
    currency,
    topCategory,
    previewImgUrl
  } = props

  const [detailsVisible, setDetailsVisible] = useState(false)

  const icon = useMemo(() => getIcon(topCategory?.icon), [topCategory?.icon])

  const options = { closeBoxURL: '', enableEventPropagation: true }

  const latitude = address?.location?.[0]
  const longitude = address?.location?.[1]

  return (
    <>
      {detailsVisible && latitude && longitude && (
        <InfoWindowF
          position={{ lat: latitude, lng: longitude }}
          options={options}>
          <MapProductView
            previewImgUrl={previewImgUrl}
            pricePerDayWithFees={pricePerDayWithFees}
            _id={_id}
            currency={currency}
            name={name}
          />
        </InfoWindowF>
      )}
      <MarkerF
        key={_id}
        onClick={() => setDetailsVisible((prev) => !prev)}
        icon={{
          url: icon,
          scaledSize: new window.google.maps.Size(32, 32),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15)
        }}
        position={{
          lat: latitude,
          lng: longitude
        }}
      />
    </>
  )
}

MarkerView.propTypes = {
  address: PropTypes.object,
  _id: PropTypes.string,
  categoryId: PropTypes.string,
  previewImgUrl: PropTypes.string,
  name: PropTypes.string,
  pricePerDayWithFees: PropTypes.number,
  currency: PropTypes.string,
  topCategory: PropTypes.object
}

export default MarkerView
