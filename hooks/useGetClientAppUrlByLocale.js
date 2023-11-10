import { useTranslations } from 'contexts'
import { useState, useEffect } from 'react'

const NEXT_PUBLIC_APP_URL_EN = process.env.NEXT_PUBLIC_APP_URL_EN
const NEXT_PUBLIC_APP_URL_NO = process.env.NEXT_PUBLIC_APP_URL_NO

const useGetClientAppUrlByLocale = () => {
  const [clientAppUrl, setClientAppUrl] = useState()

  const { defaultLanguage } = useTranslations()

  useEffect(() => {
    setClientAppUrl(
      defaultLanguage === 'no' ? NEXT_PUBLIC_APP_URL_NO : NEXT_PUBLIC_APP_URL_EN
    )
  }, [defaultLanguage])

  return clientAppUrl
}

export default useGetClientAppUrlByLocale
