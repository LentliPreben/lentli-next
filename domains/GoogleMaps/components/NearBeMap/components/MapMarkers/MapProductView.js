import { Col, Row, Space, Typography } from 'antd'
import { Link, RelativeImage } from 'components'

import PropTypes from 'prop-types'
import { currencySymbol } from 'domains/Product/helpers'
import { useTranslations } from 'contexts'

const MapProductView = (props) => {
  const { previewImgUrl, _id, name, pricePerDay, currency } = props
  const productCurrencySymbol = currencySymbol(currency)
  const { t } = useTranslations()
  const href = `/products/${_id}`

  return (
    <div style={{ width: '200px' }}>
      <Row className="mb-4">
        <Col span={10} className="pr-16">
          <RelativeImage src={previewImgUrl} withOverlay={false} />
        </Col>
        <Col span={14}>
          <Space size={2} className="flex align-baseline">
            <Typography.Title level={5}>
              {pricePerDay || 'n/a'}
            </Typography.Title>
            <Typography.Title level={5}>
              {productCurrencySymbol}
            </Typography.Title>
            <Typography.Text type="secondary">
              {' / '}
              {t('day')}
            </Typography.Text>
          </Space>
          <Link href={href}>{t('View details')}</Link>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            className="full-width mb-0">
            {name}
          </Typography.Paragraph>
        </Col>
      </Row>
    </div>
  )
}

MapProductView.propTypes = {
  previewImgUrl: PropTypes.string,
  name: PropTypes.string,
  pricePerDay: PropTypes.number,
  currency: PropTypes.string
}

export default MapProductView
