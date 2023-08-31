import { Text } from 'components'

const Spinner = (props) => {
  const { tip } = props

  const tipNode = tip ? (
    <Text variant="body2" secondary>
      {tip}
    </Text>
  ) : null

  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <div className="spinner-dot spinner-dot-left-top" />
        <div className="spinner-dot spinner-dot-right-top" />
        <div className="spinner-dot spinner-dot-left-bottom" />
        <div className="spinner-dot spinner-dot-right-bottom" />
      </div>
      {tipNode}
    </div>
  )
}

export default Spinner
