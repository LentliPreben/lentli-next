/* eslint-disable react/prop-types */
import { Layout, Grid } from 'antd'
import { useCurrentScreen } from 'hooks'
import styled from 'styled-components'

const { useBreakpoint } = Grid

const InnerContent = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['contentWidthByMedia', 'fullWidth', 'fullHeight'].includes(prop)
})`
  display: flex;
  flex-direction: column;
  height: ${({ fullHeight }) =>
    fullHeight ? 'calc(100dvh - 104px)' : '100%'}; // 104px header's height
  padding: ${({ fullWidth, lg, xs }) =>
    fullWidth ? (xs ? '20px' : '32px 48px') : lg ? '32px 0' : '32px'};
  width: ${({ currentScreen, contentWidthByMedia, fullWidth }) =>
    fullWidth ? '100%' : contentWidthByMedia?.[currentScreen]};
  margin: 0 auto;
`

const StyledContent = (props) => {
  const { children, header, showSimpleHeader, fullWidth, fullHeight, ...rest } =
    props

  const currentScreen = useCurrentScreen()
  const { lg, xs } = useBreakpoint()

  const contentWidthByMedia = {
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: '960px',
    xl: '1140px',
    xxl: '1320px'
  }

  return (
    <Layout.Content {...rest}>
      <InnerContent
        contentWidthByMedia={contentWidthByMedia}
        fullWidth={fullWidth}
        fullHeight={fullHeight}
        currentScreen={currentScreen}
        lg={lg}
        xs={xs}>
        {children}
      </InnerContent>
    </Layout.Content>
  )
}

export { StyledContent, InnerContent }
