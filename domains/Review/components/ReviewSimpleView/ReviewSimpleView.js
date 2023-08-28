import PropTypes from 'prop-types'
import { useGetUserDisplayName } from 'domains/User/hooks'
import { Avatar, Rate, Text } from 'components'
import { StyledDisplayName, StyledDisplayDate } from './ReviewSimpleView.styles'

const ReviewSimpleView = (props) => {
  const { review, rentee } = props

  const displayName = useGetUserDisplayName(rentee)
  const showDescription = !!review?.review

  const dateFormatted = review?.dateFormatted

  return (
    <div className="row gx-0">
      <div className="col-auto mr-16">
        <Avatar src={rentee?.avatarUrl} size={34} />
      </div>
      <div className="col">
        <StyledDisplayName>{displayName}</StyledDisplayName>
        <Rate type="advanced" value={review?.rating} size="small" />
      </div>
      {dateFormatted && (
        <div className="col-auto ml-auto">
          <StyledDisplayDate className="c-secondary">
            {dateFormatted}
          </StyledDisplayDate>
        </div>
      )}
      {showDescription && (
        <div className="col-12">
          <Text secondary>{review?.review}</Text>
        </div>
      )}
    </div>
  )
}

ReviewSimpleView.propTypes = {
  review: PropTypes.object,
  rentee: PropTypes.object
}

export default ReviewSimpleView
