import { Image, theme } from 'antd'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

import { ImageOverlay } from 'components'
import PropTypes from 'prop-types'
import { imgProps } from './RelativeImage.styled'

const RelativeImage = (props) => {
  const {
    src,
    ratio = 4.5 / 3,
    overlay,
    withOverlay = true,
    imgStyle,
    style,
    ...rest
  } = props

  const [width, setWidth] = useState(200)
  const ref = useRef(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      setWidth(event?.[0]?.contentBoxSize?.[0]?.inlineSize || '100%')
    })

    resizeObserver?.observe?.(ref.current)
    return () => {
      resizeObserver?.disconnect?.()
    }
  }, [])

  const height = useMemo(() => width / ratio, [width, ratio])
  const computedSrc = src || '/assets/no-image.png'

  const { borderRadiusLG } = theme.useToken().token

  return (
    <div ref={ref} style={style}>
      <Image
        {...rest}
        src={computedSrc}
        width={width}
        height={height}
        style={{
          borderRadius: borderRadiusLG,
          ...imgProps,
          ...imgStyle,
          ...style
        }}
        preview={false}
        alt="image"
      />
      {withOverlay && <ImageOverlay className="p-16">{overlay}</ImageOverlay>}
    </div>
  )
}

RelativeImage.propTypes = {
  src: PropTypes.string,
  ratio: PropTypes.number,
  overlay: PropTypes.node,
  withOverlay: PropTypes.bool,
  imgStyle: PropTypes.object,
  style: PropTypes.object
}

export default memo(RelativeImage)
