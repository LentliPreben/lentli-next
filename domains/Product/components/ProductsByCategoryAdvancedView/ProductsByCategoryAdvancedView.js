import { Button, Col, Empty, Pagination, Row, Typography } from 'antd'
import { ProductFilter, ProductList } from 'domains/Product/components'
import { memo, useCallback } from 'react'
import { useLoading, useScreen, useHorizontalScroll } from 'hooks'

import { LoadingBox } from 'components'
import PropTypes from 'prop-types'
import { StyledSpace } from './ProductsByCategoryAdvancedView.styled'
import { useFilterContext, useTranslations } from 'contexts'
import { useGetSubCategories } from 'domains/Category/hooks'
import { useRouter } from 'next/router'

const ProductsByCategoryAdvancedView = (props) => {
  const { category } = props

  const { t } = useTranslations()
  const { isSmallScreen, isExtraSmallScreen } = useScreen()
  const router = useRouter()

  const {
    loading: searchLoading,
    setCurrentPage,
    currentPage,
    totalResults,
    products
  } = useFilterContext()
  /* Fetching products and irs related data */
  const [scrollRef, handleMouseEnter, handleMouseLeave] = useHorizontalScroll()

  const [subcategories, subcategoriesLoading] = useGetSubCategories(
    category?._id
  )
  const handleOpenSubcategory = useCallback(
    (categoryId) => () => {
      router.push(`/categories/${categoryId}/products`)
    },
    [router]
  )

  // actions for product rating
  const loading = useLoading([searchLoading, subcategoriesLoading])
  const heightToNegotiate = category?.isTopLevel
    ? isExtraSmallScreen
      ? 'calc(100vh - 244px)'
      : 'calc(100vh - 200px)'
    : isExtraSmallScreen
    ? 'calc(100vh - 188px)'
    : 'calc(100vh - 142px)'
  return (
    <Row gutter={24} className="flex-1 flex-nowrap">
      <Col flex="auto">
        <LoadingBox spinnerProps={{ height: '100%' }} loading={loading}>
          <StyledSpace
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="full-width max100 x-scroll gap-8 mb-24">
            {subcategories?.map((subcategory) => (
              <Button
                onClick={handleOpenSubcategory(subcategory._id)}
                key={subcategory._id}>
                {subcategory?.name}
              </Button>
            ))}
          </StyledSpace>
          <>
            {products?.length ? (
              <ProductList
                maxHeight={heightToNegotiate}
                products={products}
                span={{ xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }}
                pagination={
                  <Pagination
                    hideOnSinglePage={true}
                    style={{ justifyContent: 'center', display: 'flex' }}
                    defaultCurrent={1}
                    total={totalResults}
                    pageSize={8}
                    current={currentPage}
                    onChange={(page) => {
                      setCurrentPage(page)
                    }}
                  />
                }
              />
            ) : (
              <Empty
                description={
                  <Typography.Text type="secondary">
                    {t("There aren't products for current category")}
                  </Typography.Text>
                }
              />
            )}
          </>
        </LoadingBox>
      </Col>
      {!isSmallScreen && !category?.isTopLevel && (
        <Col
          style={{
            minWidth: '268px',
            maxWidth: '268px'
          }}>
          <ProductFilter filterVisibility category={category} />
        </Col>
      )}
    </Row>
  )
}

ProductsByCategoryAdvancedView.propTypes = {
  category: PropTypes.object
}

export default memo(ProductsByCategoryAdvancedView)
