import { Row, Col, Typography, theme } from 'antd'
import { useTranslations } from 'contexts'
import { Icon } from '@qonsoll/icons'

const { Text } = Typography

const RatingAndIdentifyDetails = (props) => {
  const { isVerified, bio } = props

  const { colorPrimary } = theme.useToken().token
  const { t } = useTranslations()

  return (
    <Row gutter={16} className={bio && 'mb-16'}>
      {/* <Col>
        <Rate value={4.1} />  temporary mocked 
      </Col> */}
      {isVerified && (
        <Col className="flex align-center gap-4">
          <Icon name="CheckVerified2Filled" size={18} fill={colorPrimary} />
          <Text>{t('Identity verified')}</Text>
        </Col>
      )}
    </Row>
  )
}

export default RatingAndIdentifyDetails
