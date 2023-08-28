import { Logo, LanguagesMenu, LogInButton } from 'components'
import { getClassNames } from 'utils'
import { theme, Grid } from 'antd'
import { CartButton } from 'domains/Cart/components'
import { LikedProductsButton } from 'domains/Product/components'
import { HeaderWrapperStyled, HeaderStyled } from './Header.styles'
import { useCurrentScreen } from 'hooks'
import { TopCategoriesList } from 'domains/Category/components'

const { useBreakpoint } = Grid

const Header = (props) => {
  const { extraContent, topLevelCategories } = props

  const token = theme.useToken().token
  const currentScreen = useCurrentScreen()
  const { lg } = useBreakpoint()

  const headerRowClassNames = getClassNames({
    row: true,
    'justify-content-between': true,
    'align-items-center': true,
    'mb-8': true,
    'g-2': true
  })

  return (
    <HeaderWrapperStyled theme={token}>
      <HeaderStyled theme={token} currentScreen={currentScreen} lg={lg}>
        <div className={headerRowClassNames}>
          <div className="col">
            <Logo />
          </div>
          {/* <Col>
            <HeaderMenu />
          </Col> */}
          <div className="col-auto ms-auto">
            <LikedProductsButton />
          </div>
          <div className="col-auto">
            <CartButton />
          </div>
          <div className="col-auto">
            <LanguagesMenu />
          </div>
          <div className="col-auto">
            <LogInButton />
          </div>
        </div>
        {extraContent && <div className="mx-2">{extraContent}</div>}
        {topLevelCategories && (
          <div className="row align-center">
            <div className="col-12">
              <TopCategoriesList tagsView={false} data={topLevelCategories} />
            </div>
          </div>
        )}
      </HeaderStyled>
    </HeaderWrapperStyled>
  )
}

export default Header
