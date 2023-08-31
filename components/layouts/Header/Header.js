import { Logo, LanguagesMenu, LogInButton } from 'components'
import { getClassNames } from 'utils'
import { CartButton } from 'domains/Cart/components'
import { LikedProductsButton } from 'domains/Product/components'
import { HeaderWrapperStyled, HeaderStyled } from './Header.styles'
import { useBreakpoint } from 'hooks'
import { TopCategoriesList } from 'domains/Category/components'

const Header = (props) => {
  const { extraContent, topLevelCategories } = props

  const { xs, sm, md, currentScreen } = useBreakpoint()

  const headerRowClassNames = getClassNames({
    row: true,
    'justify-content-between': true,
    'align-items-center': true,
    'mb-8': true,
    'g-3': true
  })

  return (
    <HeaderWrapperStyled>
      <HeaderStyled currentScreen={currentScreen} xs={xs} sm={sm} md={md}>
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
          <div className="row align-center justify-center">
            <div className="col-auto">
              <TopCategoriesList tagsView={false} data={topLevelCategories} />
            </div>
          </div>
        )}
      </HeaderStyled>
    </HeaderWrapperStyled>
  )
}

export default Header
