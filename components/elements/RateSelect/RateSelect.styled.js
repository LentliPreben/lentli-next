import PropTypes from 'prop-types'
import { Rate } from 'antd'
import styled from 'styled-components'

const RateStyled = styled(Rate)`
  .ant-rate-star:not(:last-child) {
    margin-inline-end: 4px;
  }
  &.ant-rate .ant-rate-star .anticon.anticon-star > svg {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`
const RateWithStyles = (props) => {
  const { style, mb } = props

  const styleComputed = { ...style, marginBottom: mb }
  return <RateStyled {...props} style={styleComputed} />
}

RateWithStyles.propTypes = {
  style: PropTypes.object,
  mb: PropTypes.string
}
export { RateWithStyles as RateStyled }
