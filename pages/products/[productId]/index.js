import { ProductAdvancedView } from 'domains/Product/components'
import { useTranslations } from 'contexts'
import { useGetProductCustomActions } from 'domains/Product/hooks'
import { CategoryBreadcrumbs } from 'domains/Category/components'
import { PageLayout, Rate } from 'components'
import { getProductInitialValues } from 'domains/Product/helpers'

const Product = (props) => {
  const { productJSON } = props

  const {
    product,
    tags,
    address,
    brand,
    user,
    mediaObjects,
    averageProductRating,
    reviews,
    productsByCurrentLessor
  } = JSON.parse(productJSON)

  const rest = {
    product,
    tags,
    address,
    brand,
    user,
    mediaObjects,
    averageProductRating,
    reviews,
    productsByCurrentLessor
  }

  const { t } = useTranslations()

  const actions = useGetProductCustomActions({
    layout: 'vertical',
    productId: product?._id
  })

  const headingProps = {
    title: product?.name || t('Product show'),
    marginBottom: 4,
    textAlign: 'left',
    subTitle: <Rate type="advanced" value={averageProductRating} />,
    actions
  }
  return (
    <PageLayout
      headingProps={headingProps}
      breadcrumbs={<CategoryBreadcrumbs productId={product?._id} />}>
      <ProductAdvancedView {...rest} />
    </PageLayout>
  )
}

export default Product

export async function getServerSideProps(props) {
  try {
    const params = props?.params
    const productId = params?.productId

    const product = await getProductInitialValues(productId)
    const productJSON = JSON.stringify(product || {})

    return {
      props: { productJSON }
    }
  } catch (error) {
    console.error(error)
  }
}
