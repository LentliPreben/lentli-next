import { Logo, Text, FooterMenu } from 'components'
import { FOOTER_MENU, APP_PATHS } from '__constants__'
import { useTranslations } from 'contexts'
import { FooterWrapperStyled, FooterStyled } from './Footer.styles'
import { Row, Col, theme, Grid } from 'antd'
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
        <Row className="gap-24">
          <Col xs={24} sm={12}>
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
          </Col>
          {/* <div className="col-3"> temporary commented
            <FooterMenu
              label={FOOTER_MENU.NAVIGATION?.label}
              items={FOOTER_MENU.NAVIGATION?.items}
            />
          </div> */}
          <Col xs={24} sm={10}>
            <FooterMenu
              label={FOOTER_MENU.CONTACT?.label}
              items={FOOTER_MENU.CONTACT?.items}
            />
          </Col>
        </Row>
      </FooterStyled>
    </FooterWrapperStyled>
  )
}

export default Footer
