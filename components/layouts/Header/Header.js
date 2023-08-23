import { Logo, HeaderMenu, LanguagesMenu, LogInButton } from 'components'
import { getClassNames } from 'utils'
import { useTranslations } from 'contexts'
import { Button, Row, Col, theme, Grid } from 'antd'
import { CartButton } from 'domains/Cart/components'
import { LikedProductsButton } from 'domains/Product/components'
import { HeaderWrapperStyled, HeaderStyled } from './Header.styles'
import { useCurrentScreen } from 'hooks'
import { TopCategoriesList } from 'domains/Category/components'

const { useBreakpoint } = Grid

const Header = (props) => {
  const { extraContent, showTopLevelCategories = true } = props

  const { t } = useTranslations()

  const token = theme.useToken().token
  const currentScreen = useCurrentScreen()
  const { lg, xs } = useBreakpoint()

  const headerRowClassNames = getClassNames({
    'justify-content-between': true,
    'align-items-center': true,
    'gap-8': true,
    'mb-8': true
  })

  return (
    <HeaderWrapperStyled theme={token}>
      <HeaderStyled theme={token} currentScreen={currentScreen} lg={lg}>
        <Row className={headerRowClassNames}>
          <Col>
            <Logo />
          </Col>
          {/* <Col>
            <HeaderMenu />
          </Col> */}
          <Col className="ms-auto">
            <LikedProductsButton />
          </Col>
          <Col>
            <CartButton />
          </Col>
          <Col>
            <LanguagesMenu />
          </Col>
          <Col>
            <LogInButton />
          </Col>
        </Row>
        {extraContent && <div className="mx-2">{extraContent}</div>}
        {showTopLevelCategories && (
          <Row align="center">
            <Col>
              <TopCategoriesList tagsView={false} />
            </Col>
          </Row>
        )}
      </HeaderStyled>
    </HeaderWrapperStyled>
  )
}

export default Header
