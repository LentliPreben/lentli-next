import { Typography, theme } from 'antd'
import { useEffect, useState } from 'react'

import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import { RateStyled } from './RateSelect.styled'

const RateSelect = (props) => {
  const { size = 'md', value = 0 } = props

  const { colorWarningBorderHover } = theme.useToken().token
  const [rating, setRating] = useState(value || null)

  useEffect(() => {
    if (value) {
      setRating(value)
    }
  }, [value])

  return (
    <div className="flex gap-4 align-center">
      <Icon
        name={'StarFilled'}
        size={18}
        fill={colorWarningBorderHover}
        className="flex align-center"
      />

      <Typography.Text>{rating || 0}</Typography.Text>
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
