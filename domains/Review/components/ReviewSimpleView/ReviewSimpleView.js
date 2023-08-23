import PropTypes from 'prop-types'
import { useGetUserDisplayName } from 'domains/User/hooks'
import { Row, Col, Typography } from 'antd'
import { Avatar, Rate } from 'components'
import { StyledDisplayName, StyledDisplayDate } from './ReviewSimpleView.styles'
import moment from 'moment'

const { Text } = Typography

const ReviewSimpleView = (props) => {
  const { review, rentee } = props

  const displayName = useGetUserDisplayName(rentee)
  const showDescription = !!review?.review
  const dateFormatted = moment(review?._createdAt?.toDate()).fromNow()

  return (
    <Row gutter={[0, 4]}>
      <Col className="mr-8">
        <Avatar src={rentee?.avatarUrl} size={34} />
      </Col>
      <Col className="flex flex-col">
        <StyledDisplayName>{displayName}</StyledDisplayName>
        <Rate type="advanced" value={review?.rating} size="small" />
      </Col>
      <Col className="ml-auto">
        <StyledDisplayDate type="secondary">{dateFormatted}</StyledDisplayDate>
      </Col>
      {showDescription && (
        <Col span={24}>
          <Text type="secondary">{review?.review}</Text>
        </Col>
      )}
    </Row>
  )
}

ReviewSimpleView.propTypes = {
  review: PropTypes.object,
  rentee: PropTypes.object
}

export default ReviewSimpleView
