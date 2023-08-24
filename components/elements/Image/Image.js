import { useEffect, useMemo, useRef, useState } from 'react'
import { ImageOverlay } from 'components'
import ImageStyled from './Image.styles'

const Image = (props) => {
  const { ratio = 4.5 / 3, overlay, overlayGradient, src, ...rest } = props

  const [width, setWidth] = useState(200)
  const ref = useRef(null)

  const computedSrc = src || '/assets/no-image.png'

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      setWidth(event[0].contentBoxSize[0].inlineSize)
    })
    resizeObserver?.observe(ref?.current)
  }, [])

  const height = useMemo(() => width / ratio, [width, ratio])

  return (
    <div ref={ref}>
      <div className="p-relative">
        <ImageStyled
          alt="Image"
          src={computedSrc}
          height={height}
          width={width}
          loading="lazy"
          {...rest}
        />
        {(overlay || overlayGradient) && (
          <ImageOverlay overlayGradient={overlayGradient}>
            {overlay}
          </ImageOverlay>
        )}
      </div>
    </div>
  )
}

export default Image
