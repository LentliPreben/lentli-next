import { memo, useState } from 'react'
import { Text } from 'components'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'
import Select from 'react-select'
import CustomOptionStyled from './SearchAutocomplete.styled'

// Not finished need fix
const SearchAutocomplete = (props) => {
  const { options, onChange, onSelect, onReset } = props

  const { t } = useTranslations()

  const [loading, setLoading] = useState(false)

  const handleChange = (value) => {
    onChange?.(value)
  }

  const handleSelect = (value, setValue) => {
    setLoading(true)
    onSelect?.(value)
    setValue('')
    setLoading(false)
  }

  const CustomOption = ({
    label,
    innerRef,
    innerProps,
    data,
    setValue,
    ...rest
  }) => {
    return (
      <CustomOptionStyled
        ref={innerRef}
        {...innerProps}
        {...rest}
        onClick={() => handleSelect(rest.value, setValue)}>
        {data?.icon}
        <Text>{label}</Text>
      </CustomOptionStyled>
    )
  }

  const noOptionsMessage = () => null
  const components = {
    Option: CustomOption
  }

  return (
    <Select
      isLoading={loading}
      placeholder={t('Search by location or product name')}
      inputClassName="input"
      options={options}
      components={components}
      onReset={onReset}
      isClearable
      onInputChange={handleChange}
      noOptionsMessage={noOptionsMessage}
    />
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
