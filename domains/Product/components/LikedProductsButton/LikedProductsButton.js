import { Button, Badge } from 'antd'

import { useLikedProducts } from 'contexts'
import { Link } from 'components'
import heart from 'public/assets/heart.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'

const LikedProductsButton = () => {
  const { countLikedProducts } = useLikedProducts()

  const href = '/favorite-products'
  const { t } = useTranslations()

  return (
    <Link href={href}>
      <Button
        className="flex align-center justify-center"
        icon={
          <Badge count={countLikedProducts} size="small">
            <Image src={heart} height={18} width={18} alt={t('Like')} />
          </Badge>
        }
        size="large"
        type="text"
      />
    </Link>
  )
}

export default LikedProductsButton
