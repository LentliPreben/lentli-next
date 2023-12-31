import { Text, Button } from 'components'
import { useTranslations } from 'contexts'

const ShareByButton = () => {
  const { t } = useTranslations()

  const handleShareByMail = () => {}
  const handleShareByFacebook = () => {}
  const handleShareByTwitter = () => {}

  return (
    <div className="share-by-wrapper">
      <div className="me-2">
        <Text variant="body2">{t('Share')}</Text>
      </div>

      <Button
        type="text"
        onClick={handleShareByMail}
        size="sm"
        icon="/assets/mail.svg"
      />
      <Button
        type="text"
        onClick={handleShareByFacebook}
        size="sm"
        icon="/assets/facebook.svg"
      />
      <Button
        type="text"
        onClick={handleShareByTwitter}
        size="sm"
        icon="/assets/twitter.svg"
      />
    </div>
  )
}

export default ShareByButton
