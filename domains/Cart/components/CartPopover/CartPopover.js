import { CartList } from 'domains/Cart/components'
import { Popover, Typography } from 'antd'
import { useTranslations } from 'contexts'

const { Title } = Typography

const CartPopover = (props) => {
  const { children, countCartItems } = props

  const { t } = useTranslations()

  const popoverTitle = `${t('My cart')} (${countCartItems})`

  return (
    <Popover
      overlayClassName="cart-popover"
      showArrow={false}
      trigger="click"
      content={<CartList />}
      title={<Title level={4}>{popoverTitle}</Title>}>
      {children}
    </Popover>
  )
}

export default CartPopover
