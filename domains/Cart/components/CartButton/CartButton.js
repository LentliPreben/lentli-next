import { Button, Badge } from 'antd'

import { useCart } from 'contexts'
import { useScreen } from 'hooks'
import { CartPopover } from 'domains/Cart/components'
import { Link } from 'components'
import shoppingCart from 'public/assets/shoppingCart.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'

const CartButton = () => {
  const { countCartItems } = useCart()
  const { xs } = useScreen()
  const { t } = useTranslations()

  const buttonProps = {
    className: 'flex align-center justify-center',
    icon: (
      <Badge count={countCartItems} size="small">
        <Image width={16} height={16} src={shoppingCart} alt={t('Cart')} />
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
