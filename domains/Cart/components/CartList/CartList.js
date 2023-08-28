import { useMemo } from 'react'

import { CartSimpleView } from 'domains/Cart/components'
import { useCart, useTranslations } from 'contexts'
import { Text } from 'components'
import { getClassNames } from 'utils'

const CartList = () => {
  const { cartItems, countCartItems } = useCart()

  const { t } = useTranslations()

  const checkoutsMap = useMemo(
    () =>
      cartItems?.map((cart) => (
        <div className="col-12" key={cart?._id}>
          <CartSimpleView cart={cart} />
        </div>
      )),
    [cartItems]
  )

  const rowClassName = getClassNames({
    row: true,
    'gap-8': countCartItems,
    'full-height gap-8': !countCartItems
  })

  return (
    <div className={rowClassName}>
      {countCartItems ? (
        checkoutsMap
      ) : (
        <div className="col-12 flex align-center justify-center">
          <Text secondary>{t('Your cart is empty')}</Text>
        </div>
      )}
    </div>
  )
}

export default CartList
