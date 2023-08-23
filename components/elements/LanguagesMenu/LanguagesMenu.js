import { useState, useEffect } from 'react'
import { useTranslations } from 'contexts'
import { Select } from 'antd'

const LanguagesMenu = () => {
  const { setCurrentLanguage, languages, language } = useTranslations()

  const [defaultValue, setDefaultValue] = useState()

  useEffect(() => {
    setDefaultValue(language)
  }, [language])

  return (
    <Select
      onSelect={setCurrentLanguage}
      bordered={false}
      options={languages}
      value={defaultValue}
    />
  )
}

export default LanguagesMenu
