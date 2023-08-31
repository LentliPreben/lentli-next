import { InfoWindowF, MarkerF } from '@react-google-maps/api'
import { useMemo, useState } from 'react'

import MapProductView from './MapProductView'
import PropTypes from 'prop-types'
import { getIcon } from './helpers'
import { getTransformedImageUrl } from 'helpers'

const MarkerView = (props) => {
  const {
    address,
    _id,
    name,
    pricePerDay,
    currency,
    topCategory,
    previewImage
  } = props

  const [detailsVisible, setDetailsVisible] = useState(false)

  const icon = useMemo(() => getIcon(topCategory?.icon), [topCategory?.icon])

  const options = { closeBoxURL: '', enableEventPropagation: true }

  const previewImgUrl = getTransformedImageUrl(previewImage)

  return (
    <>
      {detailsVisible && address?.latitude && address?.longitude && (
        <InfoWindowF
          position={{ lat: address?.latitude, lng: address?.longitude }}
          options={options}>
          <MapProductView
            previewImgUrl={previewImgUrl}
            pricePerDay={pricePerDay}
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
          lat: address.latitude,
          lng: address.longitude
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
  pricePerDay: PropTypes.number,
  currency: PropTypes.string,
  topCategory: PropTypes.object
}

export default MarkerView
