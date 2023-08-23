import Image from 'next/image'
import { Title, Text } from 'components'
import { useTranslations } from 'contexts'

const ProcessOverviewItem = (props) => {
  const { title, icon, description } = props

  const { t } = useTranslations()

  return (
    <div className="process-overview-item-wrapper">
      <div className="row justify-content-center">
        <div className="col-auto mb-4">
          <Image src={icon} width={80} height={80} alt={title} />
        </div>
        <div className="col-12 mb-1">
          <Title as="h5" center>
            {t(title)}
          </Title>
        </div>
        <div className="col-12">
          <Text secondary variant="body2" center>
            {t(description)}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ProcessOverviewItem
