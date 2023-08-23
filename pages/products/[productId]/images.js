import { LoadingBox, PageHeaderSimple, PageLayout } from 'components'
import {
  useGetProduct,
  useGetProductCustomActions,
  useGetProductMediaObjectsData
} from 'domains/Product/hooks'

import { ProductImagesList } from 'domains/Product/components'
import { useLoading } from 'hooks'

const ProductImages = (props) => {
  const { productId } = props

  const [product, loadingProduct] = useGetProduct({ productId })
  const [mediaObjects, mediaObjectsLoading] =
    useGetProductMediaObjectsData(product)

  const actions = useGetProductCustomActions({ productId })

  const loading = useLoading([loadingProduct, mediaObjectsLoading])

  return (
    <PageLayout
      topHeader={<PageHeaderSimple title={product?.name} actions={actions} />}
      showFooter={false}
      showHeader={false}>
      <LoadingBox loading={loading}>
        <ProductImagesList mediaObjects={mediaObjects} />
      </LoadingBox>
    </PageLayout>
  )
}

export default ProductImages

// This gets called on every request
export async function getServerSideProps({ query, locale }) {
  const productId = query?.productId

  // Pass data to the page via props
  return {
    props: { productId }
  }
}
