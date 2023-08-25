import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useGetUserGeolocation } from 'domains/GoogleMaps/hooks'
import { useScreen } from 'hooks'
import target from 'public/assets/target.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'

const CurrentLocationButton = (props) => {
  const { onChange } = props

  const { xs } = useScreen()
  const { t } = useTranslations()

  const [handleGetUserGeolocation, loading] = useGetUserGeolocation(onChange)

  return (
    <Button
      loading={loading}
      onClick={handleGetUserGeolocation}
      size={xs ? 'large' : 'middle'}
      style={{
        position: 'absolute',
        top: xs ? 72 : 32,
        left: xs ? 20 : 48,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}
      icon={
        <Image
          src={target}
          width={18}
          height={18}
          alt={t('Current location')}
        />
      }
    />
  )
}

CurrentLocationButton.propTypes = {
  onChange: PropTypes.func
}

export default CurrentLocationButton
