import { Footer, Header } from 'components'
import StyledContent from './AppLayout.styled'

const AppLayout = (props) => {
  const {
    showFooter = true,
    showHeader = true,
    children,
    fullWidth,
    fullHeight,
    topLevelCategories
  } = props

  return (
    <div className="app-layout">
      <div className="app-content">
        {showHeader && <Header topLevelCategories={topLevelCategories} />}
        <StyledContent
          className="relative"
          fullWidth={fullWidth}
          fullHeight={fullHeight}
          showFooter={showFooter}>
          {children}
        </StyledContent>
        {showFooter && <Footer />}
      </div>
    </div>
  )
}

export default AppLayout
