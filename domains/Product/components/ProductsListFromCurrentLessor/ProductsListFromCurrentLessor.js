import { useGetProductsByUser } from 'domains/Product/hooks'
import { useRouter } from 'next/router'
import { Link, Text, Title } from 'components'
import { ProductHorizontalList } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'
import chevronRightAccent from 'public/assets/chevronRightAccent.svg'
import Image from 'next/image'

const ProductsListFromCurrentLessor = (props) => {
  const { user, showHeading = true } = props

  const router = useRouter()

  const { productId } = router.query
  const [products = []] = useGetProductsByUser(user?._id, {
    exceptCurrentProduct: true,
    currentProductId: productId
  })
  const { t } = useTranslations()

  const otherFromTitle = `${t('Other from')} ${user?.firstName} ${
    user?.lastName
  }`
  const productsAmount = products?.length
  const limitedProducts = products?.slice(0, 20)

  return (
    !!productsAmount && (
      <div className="row">
        <div className="col-12 mb-16">
          {showHeading && (
            <div className="row">
              <div className="col-auto">
                <Title as="h3">{otherFromTitle}</Title>
              </div>
              <div className="col-auto mr-auto flex align-end pb-8">
                <Text>{`${productsAmount} ${t('products')}`}</Text>
              </div>
              <div className="col-auto flex align-end">
                <Link href="/products" className="pb-12">
                  <div className="flex gap-8 align-center">
                    {t('See all')}
                    <Image
                      src={chevronRightAccent}
                      width={12}
                      height={12}
                      alt={t('See all')}
                    />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="col-12">
          <ProductHorizontalList products={limitedProducts} />
        </div>
      </div>
    )
  )
}

ProductsListFromCurrentLessor.propTypes = {
  user: PropTypes.object,
  showHeading: PropTypes.bool
}

export default ProductsListFromCurrentLessor
