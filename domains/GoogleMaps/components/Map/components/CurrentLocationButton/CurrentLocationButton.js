import { Button } from 'antd'
import { Icon } from '@qonsoll/icons'
import PropTypes from 'prop-types'
import { useGetUserGeolocation } from 'domains/GoogleMaps/hooks'
import { useScreen } from 'hooks'

const CurrentLocationButton = (props) => {
  const { onChange } = props
  const { xs } = useScreen()

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
      icon={<Icon name="Target3Outlined" size={xs ? 18 : 16} />}
    />
  )
}

CurrentLocationButton.propTypes = {
  onChange: PropTypes.func
}

export default CurrentLocationButton
