import { ProductImagesWrapper, ImageWrapper } from './ProductImagesList.styles'
import Image from 'next/image'

import { getTransformedImageUrl } from 'helpers'
import { useMemo } from 'react'
import { useBreakpoint } from 'hooks'
import { useTranslations } from 'contexts'

const ProductImagesList = (props) => {
  const { mediaObjects } = props

  const { currentScreen } = useBreakpoint()
  const { t } = useTranslations()

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
        <ImageWrapper key={url} currentScreen={currentScreen}>
          <Image src={url} preview={false} layout="fill" alt={t('Product')} />
        </ImageWrapper>
      ))}
    </ProductImagesWrapper>
  )
}

export default ProductImagesList
