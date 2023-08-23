import { Button } from 'antd'
import { Icon } from '@qonsoll/icons'
import { useCart, useLikedProducts, useTranslations } from 'contexts'

import { useScreen } from 'hooks'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL

const LogInButton = () => {
  const { t } = useTranslations()
  const { xs } = useScreen()
  const { cartDataForTransfer } = useCart()
  const { likedDataForTransfer } = useLikedProducts()

  const icon = xs ? <Icon name="LogIn2Outlined" fill="currentColor" /> : null
  const text = xs ? '' : t('Sign in')

  const handleSignIn = () => {
    const appUrl = NEXT_PUBLIC_APP_URL
    const encodedCartData = encodeURIComponent(cartDataForTransfer)
    const encodedLikedData = encodeURIComponent(likedDataForTransfer)

    const queryString = `?cart=${encodedCartData}&liked=${encodedLikedData}`

    window.open(`${appUrl}${queryString}`, '_blank')
  }

  return (
    <Button
      type="primary"
      icon={icon}
      className="flex align-center justify-center"
      onClick={handleSignIn}>
      {text}
    </Button>
  )
}

export default LogInButton
