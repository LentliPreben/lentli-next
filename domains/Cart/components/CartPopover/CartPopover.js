import { CartList } from 'domains/Cart/components'
import { Popover } from 'antd'
import { useTranslations } from 'contexts'
import { Title } from 'components'

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
      title={<Title as="h4">{popoverTitle}</Title>}>
      {children}
    </Popover>
  )
}

export default CartPopover
