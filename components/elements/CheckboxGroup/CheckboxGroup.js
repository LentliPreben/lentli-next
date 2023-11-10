import { Button, Checkbox, Text } from 'components'

import { useState } from 'react'
import { useTranslations } from 'contexts'

const DEFAULT_COUNT_OPTIONS = 8

const CheckboxGroup = (props) => {
  const { options, onChange, getCount, checkIsEnabled } = props

  const { t, language } = useTranslations()

  const [showAll, setShowAll] = useState(false)

  const showSeeMoreButton = options?.length > DEFAULT_COUNT_OPTIONS && !showAll

  const handleClickSeeMore = () => setShowAll(true)
  return (
    <div className="checkbox-group">
      {options
        ?.slice(0, showAll ? options?.length : DEFAULT_COUNT_OPTIONS)
        ?.map((value, index) => {
          const id = value?._id || value?.value || value
          const label =
            value?.names?.[language.toUpperCase()] ||
            value?.name ||
            value?.label ||
            value?.value

          const count = getCount ? getCount(value) : value?.count
          const check = checkIsEnabled?.(value, index)

          const handleChange = () => onChange(value)

          return (
            <div className="row justify-content-between" key={value}>
              <div className="col-auto">
                <Checkbox value={id} checked={check} onChange={handleChange}>
                  {label}
                </Checkbox>
              </div>
              {count && (
                <div className="col-auto">
                  <Text variant="body2" secondary align="end">
                    {count}
                  </Text>
                </div>
              )}
            </div>
          )
        })}
      {showSeeMoreButton && (
        <Button type="link" size="sm" onClick={handleClickSeeMore}>
          {t('See more')}
        </Button>
      )}
    </div>
  )
}

export default CheckboxGroup
