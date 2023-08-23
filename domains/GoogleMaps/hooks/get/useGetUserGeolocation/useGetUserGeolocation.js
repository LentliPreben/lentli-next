import { useCallback, useState } from 'react'

import { useHandleError } from 'hooks'
import { useTranslations } from 'contexts'

const useGetUserGeolocation = (onChange) => {
  const { t } = useTranslations()

  const [loading, setLoading] = useState(false)

  const handleError = useHandleError()

  const getCurrentPositionSuccessCallback = useCallback(
    (success) => {
      const {
        coords: { latitude: lat, longitude: lng }
      } = success

      setLoading(false)
      onChange({ lat, lng })
    },
    [onChange]
  )

  const getCurrentPositionErrorCallback = useCallback(
    (error) => {
      setLoading(false)
      handleError(error)
    },
    [handleError]
  )

  const handleGetGeolocation = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()

      if (!navigator.geolocation) {
        handleError({ message: t(`Browser doesn't support Geolocation`) })
      }

      navigator?.geolocation.getCurrentPosition(
        // On success
        getCurrentPositionSuccessCallback,
        // On error
        getCurrentPositionErrorCallback
      )
    },
    [
      getCurrentPositionErrorCallback,
      getCurrentPositionSuccessCallback,
      t,
      handleError
    ]
  )

  return [handleGetGeolocation, loading]
}

export default useGetUserGeolocation
