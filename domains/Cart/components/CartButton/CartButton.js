import { useCart } from 'contexts'
import { useBreakpoint } from 'hooks'
import { CartPopover } from 'domains/Cart/components'
import { Link, Button, Badge } from 'components'
import shoppingCart from 'public/assets/shoppingCart.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'

const CartButton = () => {
  const { countCartItems } = useCart()
  const { xs } = useBreakpoint()
  const { t } = useTranslations()

  const buttonProps = {
    className: 'flex align-center justify-center',
    icon: (
      <Badge count={countCartItems}>
        <Image src={shoppingCart} alt={t('Cart')} />
      </Badge>
    ),
    size: 'lg',
    type: 'text'
  }

  return xs ? (
    <Link href="/cart">
      <Button {...buttonProps} />
    </Link>
  ) : (
    <CartPopover
      show={countCartItems}
      countCartItems={countCartItems}
      overlayClassName="cart">
      <Button {...buttonProps} />
    </CartPopover>
  )
}

export default CartButton
