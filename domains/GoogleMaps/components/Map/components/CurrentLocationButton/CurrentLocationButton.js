import PropTypes from 'prop-types'
import { useGetUserGeolocation } from 'domains/GoogleMaps/hooks'
import { useBreakpoint } from 'hooks'
import target from 'public/assets/target.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'
import StyledButton from './CurrentLocationButton.styled'

const CurrentLocationButton = (props) => {
  const { onChange } = props

  const { xs } = useBreakpoint()
  const { t } = useTranslations()

  const [handleGetUserGeolocation, loading] = useGetUserGeolocation(onChange)

  return (
    <StyledButton
      loading={loading}
      onClick={handleGetUserGeolocation}
      size="md"
      xs={xs}
      icon={<Image src={target} alt={t('Current location')} />}
    />
  )
}

CurrentLocationButton.propTypes = {
  onChange: PropTypes.func
}

export default CurrentLocationButton
