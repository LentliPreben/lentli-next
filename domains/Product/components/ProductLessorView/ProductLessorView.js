import { Grid } from 'antd'
import { Avatar, Text } from 'components'
import { RatingAndIdentifyDetails } from './components'
import { useTranslations } from 'contexts'
import StyledDisplayName from './ProductLessorView.styled'

const { useBreakpoint } = Grid

const ProductLessorView = (props) => {
  const { user } = props

  const { t } = useTranslations()

  const isVerified = user?.isVerified
  const bio = user?.bio
  const formattedJoinedDate = user?.formattedJoinedDate

  const userDisplayName = `${user?.firstName} ${user?.lastName}`
  const joinedInLabel =
    formattedJoinedDate && `${t('Joined in')} ${formattedJoinedDate}`
  {
    /* Contact Lessor btn temporarily hidden */
  }
  // const buttonText = xl ? t('Contact lessor') : ''
  // const buttonIcon = xl ? null : (
  //   <Image name="MessageTextSquare1Outlined" size={18} />
  // )

  return (
    <>
      <div className="row gx-3">
        <div className="col-auto">
          <Avatar src={user?.avatarUrl} size={48} />
        </div>
        <div className="col-auto mr-auto">
          <div className="flex align-center gap-4">
            <Text>{t('Rented out by')}</Text>
            <StyledDisplayName>{userDisplayName}</StyledDisplayName>
          </div>
          <Text secondary>{joinedInLabel}</Text>
        </div>

        <div className="col-auto flex">
          <RatingAndIdentifyDetails bio={bio} isVerified={isVerified} />
        </div>

        {/* Contact Lessor btn temporarily hidden */}
        {/* <Col className="flex align-center ml-32">
          <Button
            className="flex align-center justify-center"
            icon={buttonIcon}>
            {buttonText}
          </Button>
        </Col> */}
      </div>
      {bio && (
        <div className="row mt-8">
          <div className="col">
            <Text>{bio}</Text>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductLessorView
