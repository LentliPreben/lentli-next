import { Text, NumberInput, Button } from 'components'
import { useState, useEffect } from 'react'
import { useTranslations } from 'contexts'

const RangeNumber = (props) => {
  const { defaultValue, onChange } = props

  const { t } = useTranslations()

  const [values, setValues] = useState()

  const handleChangeMinValue = (value) => {
    setValues((prevValue) => {
      const newValue = [+value || values?.[0], prevValue?.[1] || values?.[1]]
      return newValue
    })
  }
  const handleChangeMaxValue = (value) => {
    setValues((prevValue) => {
      const newValue = [prevValue?.[0] || values?.[0], +value || values?.[1]]
      return newValue
    })
  }
  const handleOk = () => onChange?.(values)

  useEffect(() => setValues(defaultValue), [defaultValue])
  return (
    <div className="range-number-wrapper">
      <NumberInput value={values?.[0]} small onChange={handleChangeMinValue} />
      <Text secondary>-</Text>
      <NumberInput value={values?.[1]} small onChange={handleChangeMaxValue} />
      <Button onClick={handleOk} size="sm">
        {t('OK')}
      </Button>
    </div>
  )
}

export default RangeNumber
