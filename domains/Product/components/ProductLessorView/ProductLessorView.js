import { Row, Col, Avatar, Typography, Button, Grid } from 'antd'
import { useTranslations } from 'contexts'
import { StyledDisplayName } from './ProductLessorView.styles'
import moment from 'moment'
import { Icon } from '@qonsoll/icons'
import { MOMENT_FORMATS } from '__constants__'
import { RatingAndIdentifyDetails } from './components'

const { Text } = Typography
const { useBreakpoint } = Grid

const ProductLessorView = (props) => {
  const { user } = props

  const { xl } = useBreakpoint()
  const { t } = useTranslations()

  const isVerified = user?.isVerified
  const bio = user?.bio
  const formattedJoinedDate = moment(user?._createdAt?.toDate()).format(
    MOMENT_FORMATS.MONTH_YEAR
  )
  const userDisplayName = `${user?.firstName} ${user?.lastName}`
  const joinedInLabel = `${t('Joined in')} ${formattedJoinedDate}`
  const buttonText = xl ? t('Contact lessor') : ''
  const buttonIcon = xl ? null : (
    <Icon name="MessageTextSquare1Outlined" size={18} />
  )

  return (
    <>
      <Row align={`center ${bio || (!xl && 'mb-16')}`}>
        <Col className="mr-16">
          <Avatar src={user?.avatarUrl} size={48} />
        </Col>
        <Col className="mr-auto">
          <div className="flex align-center gap-4">
            <Text>{t('Rented out by')}</Text>
            <StyledDisplayName level={5}>{userDisplayName}</StyledDisplayName>
          </div>
          <Text type="secondary">{joinedInLabel}</Text>
        </Col>
        {xl && (
          <Col className="flex align-center">
            <RatingAndIdentifyDetails bio={bio} isVerified={isVerified} />
          </Col>
        )}
        <Col className="flex align-center ml-32">
          <Button
            className="flex align-center justify-center"
            icon={buttonIcon}>
            {buttonText}
          </Button>
        </Col>
      </Row>
      {!xl && <RatingAndIdentifyDetails isVerified={isVerified} bio={bio} />}
      {bio && (
        <Row>
          <Col>
            <Text>{bio}</Text>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductLessorView
