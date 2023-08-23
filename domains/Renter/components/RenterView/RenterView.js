import { Avatar, Link, Title } from 'components'
import { useTranslations } from 'contexts'

const RenterView = (props) => {
  const { avatarUrl, displayName, email } = props

  const { t } = useTranslations()

  /** Temporary commented */
  // const rentedBy = `${t('Rented out by')} ${displayName}`

  return (
    <div className="renter-view-wrapper">
      <div className="renter-avatar-wrapper">
        <Avatar displayName={displayName} avatarUrl={avatarUrl} />
      </div>
      <div className="d-flex flex-column">
        <Title as="h5">{displayName}</Title>
        <Link className="c-accent" href={`mailto:${email}`}>
          {email}
        </Link>
        {/** Temporary commented */}
        {/* <ReviewSimpleView defaultValue={renterReview} disabled showLabel /> */}
      </div>
    </div>
  )
}

export default RenterView
