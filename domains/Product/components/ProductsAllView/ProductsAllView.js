import { Col, Empty, Pagination, Row, Typography } from 'antd'
import { memo } from 'react'

import { ProductList } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'
import { useScreen } from 'hooks'

const ProductsAllView = (props) => {
  const { products, totalResults, currentPage, onPageChange } = props
  const { isExtraSmallScreen } = useScreen()

  const { t } = useTranslations()

  const heightToNegotiate = isExtraSmallScreen
    ? 'calc(100dvh - 242px)'
    : 'calc(100dvh - 198px)'

  return (
    <Row gutter={24} className="flex-1">
      <Col flex="auto" span={24}>
        {products?.length ? (
          <ProductList
            maxHeight={heightToNegotiate}
            products={products}
            span={{ xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }}
            pagination={
              <Pagination
                style={{ justifyContent: 'center', display: 'flex' }}
                defaultCurrent={1}
                total={totalResults}
                pageSize={8}
                current={currentPage}
                onChange={onPageChange}
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
      </Col>
    </Row>
  )
}

ProductsAllView.propTypes = {
  category: PropTypes.object,
  products: PropTypes.array,
  totalResults: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
}

export default memo(ProductsAllView)
