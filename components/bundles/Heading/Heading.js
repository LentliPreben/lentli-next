import { Title } from 'components'

const Heading = (props) => {
  const { title, extra } = props

  return (
    <div className="mt-3">
      <div className="row justify-content-between">
        {title && (
          <div className="col-auto">
            <Title as="h3">{title}</Title>
          </div>
        )}
        {extra && <div className="col-auto">{extra}</div>}
      </div>
    </div>
  )
}

export default Heading
