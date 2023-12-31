import styled from 'styled-components'

const footerWidthByMedia = {
  xs: '100%',
  sm: '100%',
  md: '100%',
  lg: '960px',
  xl: '1140px',
  xxl: '1320px'
}

const FooterWrapperStyled = styled.footer`
  background-color: var(--secondary-lighten-4);
  border-bottom: 1px solid var(--secondary-lighten-3);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`
const FooterStyled = styled.div`
  width: ${({ currentScreen }) =>
    footerWidthByMedia?.[currentScreen] || '100%'};
  padding: ${({ xs, sm, md }) => (xs || sm || md ? '32px' : '16pxpx 0')};

  box-sizing: border-box;
`
export { FooterWrapperStyled, FooterStyled }
