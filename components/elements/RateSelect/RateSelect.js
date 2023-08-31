import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import starFilled from 'public/assets/starFilled.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'
import { Text } from 'components'

const RateSelect = (props) => {
  const { value = 0 } = props

  const { t } = useTranslations()
  const [rating, setRating] = useState(value || null)

  useEffect(() => {
    if (value) {
      setRating(value)
    }
  }, [value])

  return (
    <div className="flex gap-4 align-center">
      <Image src={starFilled} width={18} height={18} alt={t('Star')} />

      <Text>{rating || 0}</Text>
    </div>
  )
}

RateSelect.propTypes = {
  value: PropTypes.any,
  document: PropTypes.object,
  allowClear: PropTypes.bool,
  isRentee: PropTypes.bool,
  allowHalf: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltipDesc: PropTypes.array,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onRatingUpdate: PropTypes.func,
  mb: PropTypes.number
}
export default RateSelect
