import { Col, Row, Typography, theme, Grid } from 'antd'

import { CANCELLATION_TERMS_TYPES_DESCRIPTION } from '__constants__'
import { Icon } from '@qonsoll/icons'
import { formatAddress } from 'utils'
import { useTranslations } from 'contexts'
import { ProductDetailIconWrapper } from './ProductDetails.styles'

const { useBreakpoint } = Grid

const ProductDetails = (props) => {
  const { product, address } = props

  const { xl } = useBreakpoint()
  const { t } = useTranslations()

  const { colorFillSecondary } = theme.useToken().token
  const cancellationTermsDescription =
    CANCELLATION_TERMS_TYPES_DESCRIPTION?.[product?.cancellationTerms]

  const formattedAddress = formatAddress(address)
  const isRenterDelivery = product?.isRenterDelivery

  const details = [
    {
      title: 'Pick-up location',
      description: formattedAddress,
      icon: 'MarkerPin5Outlined'
    },
    isRenterDelivery && {
      title: 'Free renter delivery',
      description: 'The lessor will deliver the order to you free of charge.', // temporary mocked data
      icon: 'Truck1Outlined'
    },
    {
      title: 'Cancellation terms',
      description: cancellationTermsDescription,
      icon: 'CalendarOutlined'
    }
  ]?.filter((value) => Boolean(value))

  return (
    <Row
      gutter={[
        { xs: 0, sm: 0, md: 0, lg: 0, xl: 32 },
        { xs: 24, sm: 24, md: 24, lg: 24, xl: 0 }
      ]}>
      {details?.map(({ title, description, icon }, index) => (
        <Col key={title} xs={24} xl={8}>
          <Row>
            {!xl && (
              <Col>
                <ProductDetailIconWrapper
                  colorFillSecondary={colorFillSecondary}>
                  <Icon name={icon} size={20} />
                </ProductDetailIconWrapper>
              </Col>
            )}
            <Col className="flex-1 flex flex-col">
              <Typography.Title level={5} className="mb-4">
                {t(title)}
              </Typography.Title>
              <Typography.Text>{t(description)}</Typography.Text>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  )
}

export default ProductDetails
