import { Row, Col, Typography, theme } from 'antd'
import { useTranslations } from 'contexts'
import checkVerified from 'public/assets/checkVerified.svg'
import Image from 'next/image'

const { Text } = Typography

const RatingAndIdentifyDetails = (props) => {
  const { isVerified, bio } = props

  const { t } = useTranslations()

  return (
    <Row gutter={16} className={bio && 'mb-16'}>
      {/* <Col>
        <Rate value={4.1} />  temporary mocked 
      </Col> */}
      {isVerified && (
        <Col className="flex align-center gap-4">
          <Image
            src={checkVerified}
            width={12}
            height={12}
            alt={t('Verified')}
          />
          <Text>{t('Identity verified')}</Text>
        </Col>
      )}
    </Row>
  )
}

export default RatingAndIdentifyDetails
