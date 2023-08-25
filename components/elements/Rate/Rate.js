import { RateWrapper, LabelStyled } from './Rate.styles'
import PropTypes from 'prop-types'
import Image from 'next/image'
import starFilled from 'public/assets/starFilled.svg'
import starFilledSecondary from 'public/assets/starFilledSecondary.svg'
import { useTranslations } from 'contexts'

const Rate = (props) => {
  const { value, type = 'simple', size = 'default' } = props

  const { t } = useTranslations()

  const count = type === 'simple' ? 1 : 5
  const countArray = Array.apply(null, { length: count })
  const computedValue = value || ''

  return (
    <RateWrapper size={size}>
      {countArray?.map((_, index) => {
        const isFilled = index + 1 <= value
        const srcComputed = isFilled ? starFilled : starFilledSecondary
        return (
          <Image
            key={`start-${index}`}
            src={srcComputed}
            width={18}
            height={18}
            alt={t('Star')}
          />
        )
      })}
      <LabelStyled size={size}>{computedValue}</LabelStyled>
    </RateWrapper>
  )
}
Rate.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string,
  size: PropTypes.string
}
export default Rate
