import { Button, Badge } from 'antd'

import { useCart } from 'contexts'
import { Icon } from '@qonsoll/icons'
import { useScreen } from 'hooks'
import { CartPopover } from 'domains/Cart/components'
import { Link } from 'components'

const CartButton = () => {
  const { countCartItems } = useCart()
  const { xs } = useScreen()

  const buttonProps = {
    className: 'flex align-center justify-center',
    icon: (
      <Badge count={countCartItems} size="small">
        <Icon name="ShoppingCart1Outlined" />
      </Badge>
    ),
    size: 'large',
    type: 'text'
  }

  return xs ? (
    <Link href="/cart">
      <Button {...buttonProps} />
    </Link>
  ) : (
    <CartPopover countCartItems={countCartItems}>
      <Button {...buttonProps} />
    </CartPopover>
  )
}

export default CartButton
