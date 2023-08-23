import { Button, Divider, Row, Col, Image, theme, Typography } from 'antd'

import { Icon } from '@qonsoll/icons'
import { useRouter } from 'next/router'
import PageHeaderSimpleWrapper from './PageHeaderSimple.styles'
import logo from 'public/logos/logo-full.svg'
import { useScreen } from 'hooks'

const { Title } = Typography

const PageHeaderSimple = (props) => {
  const { title, actions, onlyLogo = false } = props

  const { xs } = useScreen()
  const router = useRouter()
  const token = theme.useToken().token

  const onBack = () => router.back()

  const logoSize = xs ? 24 : 28

  return (
    <PageHeaderSimpleWrapper theme={token}>
      {onlyLogo ? (
        <Row align="center">
          <Col>
            <Button
              onClick={onBack}
              type="text"
              className="flex align-center justify-center"
              size="large"
              icon={<Icon name="ArrowLongLeftFilled" size={20} />}
            />
          </Col>
          <Col>
            <Divider className="full-height mx-16" type="vertical" />
          </Col>

          <Col className="flex align-center">
            <Image
              src={logo}
              className="cursor-pointer"
              preview={false}
              height={logoSize}
              alt="logo"
            />
          </Col>
        </Row>
      ) : (
        <Row className="full-width">
          <Col>
            <Button
              onClick={onBack}
              type="text"
              className="flex align-center justify-center"
              size="large"
              icon={<Icon name="ArrowLongLeftFilled" size={20} />}
            />
          </Col>
          <Col>
            <Divider className="full-height mx-16" type="vertical" />
          </Col>
          <Col className="flex align-center">
            <Title level={5}>{title}</Title>
          </Col>
          <Col className="ml-auto flex align-center">{actions}</Col>
        </Row>
      )}
    </PageHeaderSimpleWrapper>
  )
}

export default PageHeaderSimple
