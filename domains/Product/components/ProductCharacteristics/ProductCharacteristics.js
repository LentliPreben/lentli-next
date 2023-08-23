import { Row, Col, Typography, theme } from 'antd'
import UnlimitedDots from './ProductCharacteristics.styles'

const ProductCharacteristics = (props) => {
  const { characteristic } = props

  const token = theme.useToken().token

  return (
    <Row gutter={[8, 8]}>
      {characteristic?.map(({ name, value }) => (
        <Col span={24} key={name}>
          <Row>
            <Col>
              <Typography.Text>{name}</Typography.Text>
            </Col>
            <Col className="flex-1">
              <UnlimitedDots theme={token} />
            </Col>
            <Col xs={12} md={10} xl={14}>
              <Typography.Text>{value}</Typography.Text>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  )
}

export default ProductCharacteristics
