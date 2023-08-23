import { Button, Badge } from 'antd'

import { Icon } from '@qonsoll/icons'
import { useLikedProducts } from 'contexts'
import { Link } from 'components'

const LikedProductsButton = () => {
  const { countLikedProducts } = useLikedProducts()

  const href = '/favorite-products'

  return (
    <Link href={href}>
      <Button
        className="flex align-center justify-center"
        icon={
          <Badge count={countLikedProducts} size="small">
            <Icon name="HeartOutlined" />
          </Badge>
        }
        size="large"
        type="text"
      />
    </Link>
  )
}

export default LikedProductsButton
