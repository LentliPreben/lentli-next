import { useMemo, useState } from 'react'
import { useSearchAllProducts } from 'domains/Product/hooks'

import { LoadingBox, PageLayout } from 'components'
import { ProductsAllView } from 'domains/Product/components'
import { getTopLevelCategories } from 'domains/Category/helpers'
import { useLoading } from 'hooks'
import { useTranslations } from 'contexts'

const Products = (props) => {
  const { t } = useTranslations()

  const [currentPage, setCurrentPage] = useState(1)

  const { topLevelCategoriesJSON } = props

  const topLevelCategories = JSON.parse(topLevelCategoriesJSON)

  const searchParams = useMemo(
    () => ({ perPage: 8, page: currentPage }),
    [currentPage]
  )

  const {
    loading: typeSenseProductsLoading,
    totalResults,
    products
  } = useSearchAllProducts(searchParams)

  const headingProps = {
    title: t('Products'),
    textAlign: 'left'
  }

  const loading = useLoading([typeSenseProductsLoading])

  return (
    <PageLayout
      headingProps={headingProps}
      topLevelCategories={topLevelCategories}>
      <LoadingBox spinnerProps={{ height: '100%' }} loading={loading}>
        <ProductsAllView
          products={products}
          totalResults={totalResults}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </LoadingBox>
    </PageLayout>
  )
}

export async function getServerSideProps(props) {
  try {
    const [, topLevelCategories] = await getTopLevelCategories()
    const topLevelCategoriesJSON = JSON.stringify(topLevelCategories || {})

    return {
      props: { topLevelCategoriesJSON }
    }
  } catch (error) {
    console.error(error)
  }
}

export default Products
