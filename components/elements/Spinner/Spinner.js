import { Text } from 'components'
import PropTypes from 'prop-types'
import { StyledSpinner } from './Spinner.styled'

const Spinner = (props) => {
  const { text, ...rest } = props

  return (
    <div className="flex flex-1 justify-center align-center" {...rest}>
      <div className="flex gap-8">
        <StyledSpinner />
        {text && <Text>{text}</Text>}
      </div>
    </div>
  )
}

Spinner.propTypes = {
  text: PropTypes.string
}

export default Spinner
