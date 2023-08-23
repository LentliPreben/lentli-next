import styled from 'styled-components'

const footerWidthByMedia = {
  xs: '100%',
  sm: '100%',
  md: '100%',
  lg: '960px',
  xl: '1140px',
  xxl: '1320px'
}

const FooterWrapperStyled = styled.header`
  background-color: ${({ theme }) => theme.colorBgMask};
  border-bottom: ${({ theme }) => `1px solid ${theme.colorBorderSecondary}`};
  display: flex;
  justify-content: center;
`

const FooterStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !['additionalSpace'].includes(prop)
})`
  width: ${({ currentScreen }) =>
    footerWidthByMedia?.[currentScreen] || '100%'};
  padding: ${({ lg, xs, sm, additionalSpace }) =>
    lg
      ? '40px 0'
      : (xs || sm) && additionalSpace
      ? '40px 32px 120px 32px'
      : '40px 32px'};
`
export { FooterWrapperStyled, FooterStyled }
