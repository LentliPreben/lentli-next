import MarkerView from './MarkerView'

const MapMarkers = (props) => {
  const { products } = props

  if (!products?.length) return null

  return products?.map((product) => (
    <MarkerView key={product._id} {...product} />
  ))
}

export default MapMarkers
