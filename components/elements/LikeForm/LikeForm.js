import LikeButtonStyled from './LikeForm.styled'
import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import heart from 'public/assets/heart.svg'
import heartFilled from 'public/assets/heartFilled.svg'

import Image from 'next/image'
import { useTranslations } from 'contexts'

const LikeForm = (props) => {
  const { value, onChange, style } = props

  const { t } = useTranslations()

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
  const srcComputed = isLiked ? heartFilled : heart

  return (
    <LikeButtonStyled
      onClick={handleChange}
      className="flex justify-center align-center"
      shape="square"
      icon={<Image src={srcComputed} height={18} width={18} alt={t('Like')} />}
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
