import { CartList } from 'domains/Cart/components'
import { useTranslations } from 'contexts'
import { Title, Popover } from 'components'

const CartPopover = (props) => {
  const { children, countCartItems, show } = props

  const { t } = useTranslations()

  const popoverTitle = `${t('My cart')} (${countCartItems})`

  return show ? (
    <Popover
      overlayClassName="cart-popover"
      showArrow={false}
      trigger="click"
      overlay={<CartList />}
      title={<Title as="h4">{popoverTitle}</Title>}>
      {children}
    </Popover>
  ) : (
    children
  )
}

export default CartPopover
