/* eslint-disable react/prop-types */
import { useBreakpoint } from 'hooks'
import styled from 'styled-components'

const LayoutStyled = styled.div`
  flex: 1;
`
const InnerContent = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['contentWidthByMedia', 'fullWidth', 'fullHeight'].includes(prop)
})`
  display: flex;
  flex-direction: column;
  height: ${({ fullHeight }) =>
    fullHeight ? 'calc(100dvh - 96px)' : '100%'}; // 96px header's height
  padding: ${({ fullWidth, md, xs, sm }) =>
    fullWidth ? (xs ? '20px' : '32px 48px') : '32px'};
  width: ${({ currentScreen, contentWidthByMedia, fullWidth }) =>
    fullWidth ? 'auto' : contentWidthByMedia?.[currentScreen]};
  margin: 0 auto;
  box-sizing: border-box;
`

const StyledContent = (props) => {
  const { children, header, showSimpleHeader, fullWidth, fullHeight, ...rest } =
    props

  const { xs, md, sm, currentScreen } = useBreakpoint()

  const contentWidthByMedia = {
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: '960px',
    xl: '1140px',
    xxl: '1320px'
  }

  return (
    <LayoutStyled {...rest}>
      <InnerContent
        contentWidthByMedia={contentWidthByMedia}
        fullWidth={fullWidth}
        fullHeight={fullHeight}
        currentScreen={currentScreen}
        md={md}
        sm={sm}
        xs={xs}>
        {children}
      </InnerContent>
    </LayoutStyled>
  )
}

export default StyledContent
