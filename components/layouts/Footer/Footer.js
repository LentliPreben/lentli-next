import { Logo, Text, FooterMenu } from 'components'
import { FOOTER_MENU, APP_PATHS } from '__constants__'
import { useTranslations } from 'contexts'
import { FooterWrapperStyled, FooterStyled } from './Footer.styles'
import { useBreakpoint } from 'hooks'
import { useRouter } from 'next/router'

const Footer = () => {
  const { t } = useTranslations()
  const router = useRouter()

  const { lg, xs, sm, md, currentScreen } = useBreakpoint()

  const additionalSpace = APP_PATHS.PRODUCT_SHOW === router.pathname

  return (
    <FooterWrapperStyled>
      <FooterStyled
        additionalSpace={additionalSpace}
        currentScreen={currentScreen}
        lg={lg}
        xs={xs}
        sm={sm}
        md={md}>
        <div className="row gap-24">
          <div className="col-12 col-sm-4">
            <div className="mb-2">
              <Logo inverse />
            </div>

            <Text inverse variant="body2">
              {t('Orgnr')}: 930 795 844
            </Text>
            <Text inverse variant="body2">
              ©lentli
            </Text>
          </div>

          <div className="col-12 col-sm-6">
            <Text inverse className="mb-4 fw-bold" variant="label2">
              {t('Contacts')}
            </Text>
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
