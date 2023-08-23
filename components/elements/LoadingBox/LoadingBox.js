import { Spin } from 'antd'

const LoadingBox = (props) => {
  const { loading, children, spinProps } = props

  if (loading)
    return (
      <div className="loading-box">
        <Spin {...spinProps} />
      </div>
    )
  return children
}

export default LoadingBox
