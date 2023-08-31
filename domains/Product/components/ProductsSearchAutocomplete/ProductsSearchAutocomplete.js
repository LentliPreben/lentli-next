import {
  useAutocompleteOptions,
  useCategoriesSearch,
  useLocationSearch,
  useProductSearch
} from './hooks'

import { OPTIONS_TYPES } from './__constants__'
import PropTypes from 'prop-types'
import SearchAutocomplete from './SearchAutocomplete'
import { memo } from 'react'
import { useHandleError } from 'hooks'

const ProductsSearchAutocomplete = (props) => {
  const {
    isLocations = true,
    isProducts = true,
    isCategories = true,
    setSelectedLocation,
    popupClassName,
    onSelect,
    ...rest
  } = props

  const handleError = useHandleError()
  const locationSearch = useLocationSearch(setSelectedLocation)
  const categoriesSearch = useCategoriesSearch()
  const productsSearch = useProductSearch()

  const options = useAutocompleteOptions(
    locationSearch.data,
    productsSearch.data,
    categoriesSearch.data
  )

  const handleChange = (value) => {
    if (isLocations) locationSearch.onChange(value)
    if (isProducts) productsSearch.onChange(value)
    if (isCategories) categoriesSearch.onChange(value)
  }

  const onReset = () => {
    if (isLocations) locationSearch.onReset()
    if (isProducts) productsSearch.onReset()
    if (isCategories) categoriesSearch.onReset()
  }

  const handleSelect = (json) => {
    try {
      const { type, id } = JSON.parse(json)

      const searchTypes = {
        [OPTIONS_TYPES.LOCATION]: isLocations && locationSearch,
        [OPTIONS_TYPES.PRODUCT]: isProducts && productsSearch,
        [OPTIONS_TYPES.CATEGORY]: isCategories && categoriesSearch
      }

      const handler = searchTypes[type]

      if (handler) {
        handler.onSelect(id)
        onSelect?.()
        onReset()
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <SearchAutocomplete
      popupClassName={popupClassName}
      onChange={handleChange}
      onSelect={handleSelect}
      onReset={onReset}
      options={options}
      {...rest}
    />
  )
}

ProductsSearchAutocomplete.propTypes = {
  isLocations: PropTypes.bool,
  isProducts: PropTypes.bool,
  isCategories: PropTypes.bool,
  setSelectedLocation: PropTypes.func,
  onSelect: PropTypes.func,
  popupClassName: PropTypes.string
}

export default memo(ProductsSearchAutocomplete)
