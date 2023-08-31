import { useState, useEffect } from 'react'
import { useTranslations } from 'contexts'
import Select from 'components/elements/Select'
const LanguagesMenu = () => {
  const { setCurrentLanguage, languages, language } = useTranslations()

  const [selectedOption, setSelectedOption] = useState()

  const handleChange = (option) => setCurrentLanguage(option.value)

  const styles = {
    control: (baseStyles) => ({
      ...baseStyles,
      border: 'unset',
      boxShadow: 'unset',
      width: 'fit-content'
    })
  }
  const components = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null
  }

  useEffect(() => {
    setSelectedOption(languages?.find(({ value }) => value === language))
  }, [language, languages])

  return (
    <Select
      className="language-menu"
      onChange={handleChange}
      options={languages}
      value={selectedOption}
      components={components}
      styles={styles}
    />
  )
}

export default LanguagesMenu
