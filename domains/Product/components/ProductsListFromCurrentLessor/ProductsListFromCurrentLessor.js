import { Col, Row, Space, Typography } from 'antd'
import { useGetProductsByUser } from 'domains/Product/hooks'
import { useRouter } from 'next/router'
import { Link } from 'components'
import { ProductHorizontalList } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts'
import { Icon } from '@qonsoll/icons'

const { Title, Text } = Typography

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
      <Row>
        <Col span={24} className="mb-16">
          {showHeading && (
            <Row gutter={16}>
              <Col>
                <Title level={2}>{otherFromTitle}</Title>
              </Col>
              <Col className="mr-auto flex align-end pb-2">
                <Text>{`${productsAmount} ${t('products')}`}</Text>
              </Col>
              <Col className="flex align-end">
                <Link href="/products">
                  <Space>
                    {t('See all')}
                    <Icon
                      name="ChevronRightOutlined"
                      ml={1}
                      fill="currentColor"
                      size={16}
                    />
                  </Space>
                </Link>
              </Col>
            </Row>
          )}
        </Col>
        <Col span={24}>
          <ProductHorizontalList products={limitedProducts} />
        </Col>
      </Row>
    )
  )
}

ProductsListFromCurrentLessor.propTypes = {
  user: PropTypes.object,
  showHeading: PropTypes.bool
}

export default ProductsListFromCurrentLessor
