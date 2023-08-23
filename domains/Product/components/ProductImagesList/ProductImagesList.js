import { ImageStyled, ProductImagesWrapper } from './ProductImagesList.styles'

import { getTransformedImageUrl } from 'helpers'
import { useMemo } from 'react'

const ProductImagesList = (props) => {
  const { mediaObjects } = props

  const media = useMemo(
    () =>
      mediaObjects?.map((mediaObject) =>
        getTransformedImageUrl(mediaObject, 'original')
      ),
    [mediaObjects]
  )
  return (
    <ProductImagesWrapper>
      {media?.map((url) => (
        <ImageStyled key={url} src={url} preview={false} />
      ))}
    </ProductImagesWrapper>
  )
}

export default ProductImagesList
