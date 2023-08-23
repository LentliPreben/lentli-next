import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { ReviewSimpleView } from 'domains/Review/components'
import ReviewsListWrapper from './ReviewsList.styled'

const ReviewsList = (props) => {
  const { reviews } = props

  return (
    <ReviewsListWrapper>
      <Row gutter={[0, 16]}>
        {reviews.map(({ review, rentee }) => (
          <Col span={24} key={review?._id}>
            <ReviewSimpleView review={review} rentee={rentee} />
          </Col>
        ))}
      </Row>
    </ReviewsListWrapper>
  )
}

ReviewsList.propTypes = {
  reviews: PropTypes.array
}
export default ReviewsList
