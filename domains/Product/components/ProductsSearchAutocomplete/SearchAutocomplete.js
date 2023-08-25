import { AutoComplete, Input } from 'antd'
import { cloneElement, memo, useState } from 'react'

import PropTypes from 'prop-types'
import { autoCompleteStyles } from './ProductsSearchAutocomplete.styled'
import { useTranslations } from 'contexts'
import searchLg from 'public/assets/searchLg.svg'
import Image from 'next/image'

const SearchAutocomplete = (props) => {
  const {
    options,
    onChange,
    onSelect,
    onReset,
    value,
    input,
    popupClassName,
    ...rest
  } = props

  const [query, setQuery] = useState('')

  const { t } = useTranslations()

  const handleChange = (e) => {
    const value = e.target.value
    onChange?.(value)
    setQuery(value)
  }

  const handleSelect = (value) => {
    onSelect?.(value)
    onReset?.()
    setQuery('')
  }

  return (
    <AutoComplete
      style={autoCompleteStyles}
      popupClassName={popupClassName}
      value={query}
      open={!!query}
      options={options}
      onSelect={handleSelect}>
      {input ? (
        cloneElement(input, { onChange: handleChange })
      ) : (
        <Input
          prefix={
            <Image src={searchLg} width={12} height={12} alt={t('Search')} />
          }
          placeholder={`${t('Search by location or product name')}..`}
          onChange={handleChange}
          {...rest}
        />
      )}
    </AutoComplete>
  )
}

SearchAutocomplete.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  value: PropTypes.string,
  input: PropTypes.node,
  popupClassName: PropTypes.string,
  onReset: PropTypes.func
}

export default memo(SearchAutocomplete)
