import styled from 'styled-components'

const headerWidthByMedia = {
  xs: '100%',
  sm: '100%',
  md: '100%',
  lg: '960px',
  xl: '1140px',
  xxl: '1320px'
}

const HeaderWrapperStyled = styled.header`
  background-color: var(--text-color-inverse);
  border-bottom: 1px solid var(--border-default-color);
  display: flex;
  justify-content: center;
`

const HeaderStyled = styled.div`
  width: ${({ currentScreen }) =>
    headerWidthByMedia?.[currentScreen] || '100%'};
  padding: ${({ xs, sm, md }) => (xs || sm || md ? '16px 32px' : '16px 0')};
  box-sizing: border-box;
`
export { HeaderWrapperStyled, HeaderStyled }
