import {
  Footer,
  Header,
  Content,
  Breadcrumbs,
  LoadingBox,
  Heading
} from 'components'
import { useTranslations } from 'contexts'
import { useGetBreadcrumbsConfig } from 'hooks'
import { useRouter } from 'next/router'

const PageWrapper = (props) => {
  const {
    className,
    children,
    headerProps,
    showBreadcrumbs,
    loading,
    headingProps
  } = props

  const { t } = useTranslations()
  const router = useRouter()

  const categoryId = router.query?.categoryId
  const productId = router.query?.productId

  const [breadcrumbs, loadingBreadcrumbs] = useGetBreadcrumbsConfig({
    categoryId,
    productId
  })

  const loadingComputed = (showBreadcrumbs && loadingBreadcrumbs) || loading

  return (
    <main className={className}>
      <Header {...headerProps} />
      <LoadingBox loading={loadingComputed} spinProps={{ tip: t('Loading') }}>
        {headingProps && <Heading {...headingProps} />}
        {showBreadcrumbs && <Breadcrumbs config={breadcrumbs} />}
        <Content showBreadcrumbs={showBreadcrumbs}>{children}</Content>
      </LoadingBox>
      <Footer />
    </main>
  )
}

export default PageWrapper
