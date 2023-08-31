import { useLikedProducts } from 'contexts'
import { Button } from 'components'
import heart from 'public/assets/heart.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'
import { useRouter } from 'next/router'
import Badge from 'components/elements/Badge'

const LikedProductsButton = () => {
  const { countLikedProducts } = useLikedProducts()

  const { t } = useTranslations()
  const router = useRouter()

  const handleGoToFavoriteProducts = () =>
    router.push({
      pathname: '/favorite-products'
    })

  return (
    <Button
      onClick={handleGoToFavoriteProducts}
      className="flex align-center justify-center"
      icon={
        <Badge count={countLikedProducts}>
          <Image src={heart} alt={t('Like')} />
        </Badge>
      }
      size="lg"
      type="text"
    />
  )
}

export default LikedProductsButton
