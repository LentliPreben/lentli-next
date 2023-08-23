import { MapMarkers, NearBeSearch } from './components'

import { Map } from 'domains/GoogleMaps/components'
import PropTypes from 'prop-types'
import { StyledWrapper } from './NearBeMap.styled'
import { FilterButton } from 'components'
import { useFilterContext } from 'contexts'
import { useGetNearProductsData } from 'domains/Product/hooks'

const NEXT_PUBLIC_GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID

const NearBeMap = () => {
  const {
    selectedLocation,
    setSelectedLocation,
    searchRadius,
    setSearchRadius,
    filteredNearByProducts
  } = useFilterContext()

  const productsData = useGetNearProductsData(filteredNearByProducts)

  return (
    <StyledWrapper className="blurry-content">
      <div className="blurry-overlay" />
      <Map
        value={selectedLocation}
        onChange={setSelectedLocation}
        circleRadius={searchRadius}
        options={{
          mapId: NEXT_PUBLIC_GOOGLE_MAP_ID,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false
        }}
        markers={<MapMarkers products={productsData} />}>
        <NearBeSearch
          setSelectedLocation={setSelectedLocation}
          isCategories={false}
        />
        <FilterButton
          position="absolute"
          searchRadius={searchRadius}
          setSearchRadius={setSearchRadius}
        />
      </Map>
    </StyledWrapper>
  )
}

NearBeMap.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  selectedLocation: PropTypes.object,
  setSelectedLocation: PropTypes.func,
  searchRadius: PropTypes.number,
  setSearchRadius: PropTypes.func
}

export default NearBeMap
