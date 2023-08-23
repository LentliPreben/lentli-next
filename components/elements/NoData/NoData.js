import Image from 'next/image'
import { Text } from 'components'

const NoData = (props) => {
  const { description = 'No matching search result' } = props

  return (
    <div className="row py-6">
      <div className="col-12 d-flex justify-content-center mb-2">
        <Image
          alt="No data"
          width={220}
          height={220}
          src="/assets/no-data.svg"
        />
      </div>
      {description && (
        <div className="col-12 d-flex justify-content-center">
          <Text secondary>{description}</Text>
        </div>
      )}
    </div>
  )
}

export default NoData
