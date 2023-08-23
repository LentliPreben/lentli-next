import LikeButtonStyled from './LikeForm.styled'
import { useEffect, useState } from 'react'

import { theme } from 'antd'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'

const LikeForm = (props) => {
  const { value, onChange, style } = props

  const token = theme.useToken().token

  const [isLiked, setIsLiked] = useState(false)

  const handleChange = (e) => {
    e.stopPropagation()
    setIsLiked((prevValue) => {
      const newValue = !prevValue
      onChange?.(newValue)
      return newValue
    })
  }

  useEffect(() => {
    if (value !== undefined) {
      setIsLiked(value)
    }
  }, [value])

  return (
    <LikeButtonStyled
      onClick={handleChange}
      className="flex justify-center align-center"
      shape="square"
      isLiked={isLiked}
      theme={token}
      icon={<Icon name="HeartOutlined" size={16} />}
      style={style}
    />
  )
}

LikeForm.propTypes = {
  iconSize: PropTypes.number,
  filled: PropTypes.bool,
  onChange: PropTypes.func,
  onLikeUpdate: PropTypes.func,
  value: PropTypes.bool,
  document: PropTypes.object
}

export default LikeForm
