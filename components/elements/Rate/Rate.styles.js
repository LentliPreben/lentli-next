import styled from 'styled-components'

const CONFIG_BY_SIZE = {
  default: { fontSize: '16px', lineHeight: '20px', gap: '4px', iconSize: 20 },
  small: { fontSize: '12px', lineHeight: '16px', gap: '2px', iconSize: 14 }
}

const RateWrapper = styled.div`
  display: flex;
  gap: ${({ size }) => CONFIG_BY_SIZE?.[size]?.gap};
  align-items: center;
`

const LabelStyled = styled.p`
  font-size: ${({ size }) => CONFIG_BY_SIZE?.[size]?.fontSize};
  line-height: ${({ size }) => CONFIG_BY_SIZE?.[size]?.lineHeight};
  margin-left: 4px;
`

export { RateWrapper, LabelStyled }
