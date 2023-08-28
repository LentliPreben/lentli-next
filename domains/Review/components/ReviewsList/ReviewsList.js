import PropTypes from 'prop-types'
import { ReviewSimpleView } from 'domains/Review/components'
import ReviewsListWrapper from './ReviewsList.styled'

const ReviewsList = (props) => {
  const { reviews } = props

  return (
    <ReviewsListWrapper>
      <div className="row gx-0 gy-3">
        {reviews.map(({ review, rentee }) => (
          <div className="col-12" key={review?._id}>
            <ReviewSimpleView review={review} rentee={rentee} />
          </div>
        ))}
      </div>
    </ReviewsListWrapper>
  )
}

ReviewsList.propTypes = {
  reviews: PropTypes.array
}
export default ReviewsList
