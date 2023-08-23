import { Col, Row, Typography } from 'antd'
import { useMemo } from 'react'

import { CartSimpleView } from 'domains/Cart/components'
import { useCart, useTranslations } from 'contexts'

const { Text } = Typography

const CartList = () => {
  const { cartItems, countCartItems } = useCart()

  const { t } = useTranslations()

  const checkoutsMap = useMemo(
    () =>
      cartItems?.map((cart) => (
        <Col span={24} key={cart?._id}>
          <CartSimpleView cart={cart} />
        </Col>
      )),
    [cartItems]
  )

  const rowClassName = countCartItems ? ' gap-8' : 'full-height gap-8'

  return (
    <Row className={rowClassName}>
      {countCartItems ? (
        checkoutsMap
      ) : (
        <Col span={24} className="flex align-center justify-center">
          <Text type="secondary">{t('Your cart is empty')}</Text>
        </Col>
      )}
    </Row>
  )
}

export default CartList
