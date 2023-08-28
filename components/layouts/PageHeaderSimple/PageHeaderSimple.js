import { Button, Divider, theme } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PageHeaderSimpleWrapper from './PageHeaderSimple.styles'
import logo from 'public/logos/logo-full.webp'
import { useScreen } from 'hooks'
import arrowLongLeft from 'public/assets/arrowLongLeft.svg'
import { useTranslations } from 'contexts'
import { Title } from 'components'

const PageHeaderSimple = (props) => {
  const { title, actions, onlyLogo = false } = props

  const { t } = useTranslations()

  const { xs } = useScreen()
  const router = useRouter()
  const token = theme.useToken().token

  const onBack = () => router.back()

  const logoSize = xs ? 24 : 28

  return (
    <PageHeaderSimpleWrapper theme={token}>
      {onlyLogo ? (
        <div className="row align-center">
          <div className="col-auto">
            <Button
              onClick={onBack}
              type="text"
              className="flex align-center justify-center"
              size="large"
              icon={
                <Image
                  src={arrowLongLeft}
                  height={18}
                  width={18}
                  alt={t('Back')}
                />
              }
            />
          </div>
          <div className="col">
            <Divider className="full-height mx-16" type="vertical" />
          </div>
          <div className="col flex align-center">
            <Image
              src={logo}
              className="cursor-pointer"
              preview={false}
              height={logoSize}
              alt="logo"
            />
          </div>
        </div>
      ) : (
        <div className="row full-width g-0">
          <div className="col-auto">
            <Button
              onClick={onBack}
              type="text"
              className="flex align-center justify-center"
              size="large"
              icon={
                <Image
                  src={arrowLongLeft}
                  height={18}
                  width={18}
                  alt={t('Back')}
                />
              }
            />
          </div>
          <div className="col-auto">
            <Divider className="full-height mx-16" type="vertical" />
          </div>
          <div className="col flex align-center">
            <Title as="h5">{title}</Title>
          </div>
          <div className="col-auto ml-auto flex align-center">{actions}</div>
        </div>
      )}
    </PageHeaderSimpleWrapper>
  )
}

export default PageHeaderSimple
