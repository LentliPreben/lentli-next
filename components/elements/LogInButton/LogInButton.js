import { Button } from 'components'
import Image from 'next/image'
import { useCart, useLikedProducts, useTranslations } from 'contexts'
import logIn from 'public/assets/logIn.svg'
import { useBreakpoint } from 'hooks'

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL

const LogInButton = () => {
  const { t } = useTranslations()
  const { xs } = useBreakpoint()
  const { cartDataForTransfer } = useCart()
  const { likedDataForTransfer } = useLikedProducts()

  const icon = xs ? <Image alt={t('Log in')} src={logIn} /> : null
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
