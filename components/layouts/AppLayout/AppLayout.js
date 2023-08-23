import { Footer, Header } from 'components'
import { Layout } from 'antd'
import { StyledContent } from './AppLayout.styled'
import Head from 'next/head'

const AppLayout = (props) => {
  const {
    showFooter = true,
    showHeader = true,
    children,
    fullWidth,
    fullHeight,
    showTopLevelCategories
  } = props

  return (
    <>
      <Head>
        <title>Lentli</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="app-layout">
        <Layout className="relative">
          {showHeader && (
            <Header showTopLevelCategories={showTopLevelCategories} />
          )}
          <StyledContent
            className="relative"
            fullWidth={fullWidth}
            fullHeight={fullHeight}>
            {children}
          </StyledContent>
          {showFooter && <Footer />}
        </Layout>
      </Layout>
    </>
  )
}

export default AppLayout
