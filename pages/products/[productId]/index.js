import { ProductAdvancedView } from 'domains/Product/components'
import { useTranslations } from 'contexts'
import {
  useGetProductInitialValues,
  useGetProductsByUser,
  useGetProductCustomActions
} from 'domains/Product/hooks'
import { useLoading } from 'hooks'
import { CategoryBreadcrumbs } from 'domains/Category/components'
import { LoadingBox, PageLayout, Rate } from 'components'

const Product = (props) => {
  const { productId } = props

  const { t } = useTranslations()
  const [initialValues, loadingProduct] = useGetProductInitialValues({
    productId
  })
  const [productsByCurrentLessor, loadingProducts] = useGetProductsByUser(
    initialValues?.user?._id,
    { exceptCurrentProduct: true, currentProductId: productId }
  )
  const actions = useGetProductCustomActions({ layout: 'vertical', productId })

  const loading = useLoading([
    loadingProducts,
    loadingProduct,
    !productsByCurrentLessor
  ])

  const headingProps = !loading && {
    title: initialValues?.product?.name || t('Product show'),
    marginBottom: 4,
    textAlign: 'left',
    subTitle: <Rate type="advanced" value={initialValues?.rating} />,
    actions
  }
  return (
    <PageLayout
      headingProps={headingProps}
      breadcrumbs={<CategoryBreadcrumbs productId={productId} />}>
      <LoadingBox
        loading={loading}
        spinnerProps={{ text: t('Product loading') }}>
        <ProductAdvancedView
          {...initialValues}
          productsByCurrentLessor={productsByCurrentLessor}
        />
      </LoadingBox>
    </PageLayout>
  )
}

export default Product

export function getServerSideProps(props) {
  return {
    props: { productId: props?.params?.productId }
  }
}
