import { ProductsSearchAutocomplete } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { StyledWrapper } from './NearBeSearch.styled'
import { memo } from 'react'
import { useScreen } from 'hooks'

const NearBeSearch = (props) => {
  const { setSelectedLocation, ...rest } = props

  const { xs } = useScreen()

  return (
    <StyledWrapper xs={xs}>
      <ProductsSearchAutocomplete
        size={xs ? 'large' : 'middle'}
        setSelectedLocation={setSelectedLocation}
        isCategories={false}
        {...rest}
      />
    </StyledWrapper>
  )
}

NearBeSearch.propTypes = {
  setSelectedLocation: PropTypes.func
}

export default memo(NearBeSearch)
