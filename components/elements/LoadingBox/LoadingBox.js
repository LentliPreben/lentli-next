import { useTranslations } from 'contexts'

const LoadingBox = (props) => {
  const { loading, children } = props

  const { t } = useTranslations()

  if (loading) return <div className="loading-box">{t('Loading')}</div>
  return children
}

export default LoadingBox
