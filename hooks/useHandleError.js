import { notification } from 'antd'
import { useCallback } from 'react'
import { useTranslations } from 'contexts'

const notificationParams = { style: { top: '64px', right: 0 }, duration: 6 }

const useHandleError = () => {
  const { t } = useTranslations()

  const handleError = useCallback(
    (err, message) => {
      // eslint-disable-next-line no-console
      console.error(err)

      notification.error({
        message: message || t('Something went wrong'),
        description: err.message,
        ...notificationParams
      })
    },
    [t]
  )

  return handleError
}

export default useHandleError
