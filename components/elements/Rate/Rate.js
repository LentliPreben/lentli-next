import { theme } from 'antd'
import { IconStyled, RateWrapper, LabelStyled } from './Rate.styles'
import PropTypes from 'prop-types'

const Rate = (props) => {
  const { value, type = 'simple', size = 'default' } = props

  const token = theme.useToken().token

  const count = type === 'simple' ? 1 : 5
  const countArray = Array.apply(null, { length: count })
  const computedValue = value || ''

  return (
    <RateWrapper size={size}>
      {countArray?.map((_, index) => {
        const isFilled = index + 1 <= value

        return (
          <IconStyled
            key={`start-${index}`}
            name="StarFilled"
            size={size}
            isFilled={isFilled}
            theme={token}
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
  size: PropTypes.number
}
export default Rate
