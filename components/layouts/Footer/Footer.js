import { Logo, Text, FooterMenu } from 'components'
import { FOOTER_MENU, APP_PATHS } from '__constants__'
import { useTranslations } from 'contexts'
import { FooterWrapperStyled, FooterStyled } from './Footer.styles'
import { theme, Grid } from 'antd'
import { useCurrentScreen } from 'hooks'
import { useRouter } from 'next/router'

const { useBreakpoint } = Grid

const Footer = () => {
  const { t } = useTranslations()
  const router = useRouter()

  const token = theme.useToken().token
  const currentScreen = useCurrentScreen()
  const { xs, sm, lg } = useBreakpoint()

  const additionalSpace = APP_PATHS.PRODUCT_SHOW === router.pathname

  return (
    <FooterWrapperStyled theme={token}>
      <FooterStyled
        additionalSpace={additionalSpace}
        theme={token}
        currentScreen={currentScreen}
        xs={xs}
        sm={sm}
        lg={lg}>
        <div className="row gap-24">
          <div className="col-12 col-sm-6">
            <div className="mb-2">
              <Logo inverse />
            </div>
            <Text inverse variant="body2">
              {t('Teasy er en tjeneste levert av GetOnNet AS.')}
            </Text>
            <Text inverse variant="body2">
              www.lentli.no
            </Text>
            <Text inverse variant="body2">
              {t('Orgnr')}: 121238580706
            </Text>
            <Text inverse variant="body2">
              ©lentli
            </Text>
          </div>
          {/* <div className="col-3"> temporary commented
            <FooterMenu
              label={FOOTER_MENU.NAVIGATION?.label}
              items={FOOTER_MENU.NAVIGATION?.items}
            />
          </div> */}
          <div className="col-12 col-sm-10">
            <FooterMenu
              label={FOOTER_MENU.CONTACT?.label}
              items={FOOTER_MENU.CONTACT?.items}
            />
          </div>
        </div>
      </FooterStyled>
    </FooterWrapperStyled>
  )
}

export default Footer
