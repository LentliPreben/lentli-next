import { ProductsSearchAutocomplete } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { StyledWrapper } from './NearBeSearch.styled'
import { memo } from 'react'
import { useBreakpoint } from 'hooks'

const NearBeSearch = (props) => {
  const { setSelectedLocation, ...rest } = props

  const { xs } = useBreakpoint()

  return (
    <StyledWrapper xs={xs}>
      <ProductsSearchAutocomplete
        size="sm"
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
