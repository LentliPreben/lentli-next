import { getClassNames } from 'utils'

const ImageOverlay = (props) => {
  const { children, overlayGradient, ...rest } = props

  const className = getClassNames({
    ['image-overlay']: true,
    gradient: overlayGradient
  })

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

export default ImageOverlay
