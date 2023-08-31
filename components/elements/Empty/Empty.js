import noData from 'public/assets/filterLines.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'
import { Text } from 'components'

const Empty = (props) => {
  const { description } = props

  const { t } = useTranslations()

  return (
    <div className="row">
      <div className="col-auto">
        <Image src={filterLines} alt={t('No data')} />
      </div>
      <div className="col-12">
        <Text secondary>{description}</Text>
      </div>
    </div>
  )
}

export default Empty
