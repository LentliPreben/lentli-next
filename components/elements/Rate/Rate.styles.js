import { Icon } from '@qonsoll/icons'
import styled from 'styled-components'
import { Typography } from 'antd'

const CONFIG_BY_SIZE = {
  default: { fontSize: '16px', lineHeight: '20px', gap: '4px', iconSize: 20 },
  small: { fontSize: '12px', lineHeight: '16px', gap: '2px', iconSize: 14 }
}
const IconStyled = styled(Icon).attrs(({ size, ...rest }) => ({
  size: CONFIG_BY_SIZE?.[size]?.iconSize,
  ...rest
}))`
  display: flex;

  path {
    fill: ${({ isFilled, theme }) =>
      isFilled ? '#FADB14' : `${theme?.colorFillSecondary}`};
  }
`
const RateWrapper = styled.div`
  display: flex;
  gap: ${({ size }) => CONFIG_BY_SIZE?.[size]?.gap};
  align-items: center;
`

const LabelStyled = styled(Typography.Text)`
  font-size: ${({ size }) => CONFIG_BY_SIZE?.[size]?.fontSize};
  line-height: ${({ size }) => CONFIG_BY_SIZE?.[size]?.lineHeight};
  margin-left: 4px;
`

export { IconStyled, RateWrapper, LabelStyled }
