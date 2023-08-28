import { PageLayout } from 'components'
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
      <CartList />
    </PageLayout>
  )
}

export default Cart
