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
  background-color: ${({ theme }) => theme.colorBgBase};
  border-bottom: ${({ theme }) => `1px solid ${theme.colorBorderSecondary}`};
  display: flex;
  justify-content: center;
`

const HeaderStyled = styled.div`
  width: ${({ currentScreen }) =>
    headerWidthByMedia?.[currentScreen] || '100%'};
  padding: ${({ lg }) => (lg ? '12px 0' : '12px 32px')};
`
export { HeaderWrapperStyled, HeaderStyled }
