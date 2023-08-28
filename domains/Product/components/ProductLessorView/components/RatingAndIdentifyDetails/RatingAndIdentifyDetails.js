import { useTranslations } from 'contexts'
import checkVerified from 'public/assets/checkVerified.svg'
import Image from 'next/image'
import { Text } from 'components'

const RatingAndIdentifyDetails = (props) => {
  const { isVerified } = props

  const { t } = useTranslations()

  return (
    <div className="row">
      {/* <Col>
        <Rate value={4.1} />  temporary mocked 
      </Col> */}
      {isVerified && (
        <div className="col-auto flex align-center gap-4">
          <Image
            src={checkVerified}
            width={16}
            height={16}
            alt={t('Verified')}
          />
          <Text className="d-none d-sm-flex">{t('Identity verified')}</Text>
        </div>
      )}
    </div>
  )
}

export default RatingAndIdentifyDetails
