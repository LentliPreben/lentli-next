import { Text } from 'components'
import Image from 'next/image'
import { useTranslations } from 'contexts'

const RenterDetails = (props) => {
  const {
    isVerifiedByBankID,
    responseRate,
    respondingTime,
    country,
    isInsured
  } = props

  const { t } = useTranslations()

  const DETAILS = [
    isVerifiedByBankID && {
      icon: '/assets/verified.svg',
      information: t('Verified by BankID'),
      className: 'col-4'
    },
    {
      icon: '/assets/clock.svg',
      information: respondingTime,
      className: 'col-6'
    },
    {
      icon: '/assets/chat.svg',
      information: `${responseRate}% ${t('response rate')}`,
      className: 'col-4'
    },
    {
      icon: '/assets/pin.svg',
      information: country,
      className: 'col-3'
    },
    isInsured && {
      icon: '/assets/insurance.svg',
      information: t('Insurance'),
      className: 'col-3'
    }
  ]
  return (
    <div className="row renter-details-wrapper">
      {DETAILS.map(({ icon, information, className }) => (
        <div key="icon" className={`${className} renter-detail-item`}>
          <Image src={icon} width={20} height={20} alt="Icon" />
          <Text variant="body2">{information}</Text>
        </div>
      ))}
    </div>
  )
}

export default RenterDetails
