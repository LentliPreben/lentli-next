import { PageLayout } from 'components'
import { Col, Row } from 'antd'
import { useTranslations } from 'contexts'

import { CartList } from 'domains/Cart/components'

const Cart = () => {
  const { t } = useTranslations()

  const headingProps = {
    title: t('Cart'),
    textAlign: 'left'
  }

  return (
    <PageLayout headingProps={headingProps}>
      <Row gutter={[24, 16]}>
        <Col flex="auto">
          <CartList />
        </Col>
      </Row>
    </PageLayout>
  )
}

export default Cart
