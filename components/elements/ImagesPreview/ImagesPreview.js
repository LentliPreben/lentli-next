import { Button, Grid, Image } from 'antd'
import {
  CountImagesWrapper,
  ImagesPreviewWrapper,
  MainImageWrapper,
  SmallImagePreview,
  SmallImagesPreviewWrapper
} from './ImagesPreview.styled'

import { useGetImagesPreviewConfig } from 'domains/Product/hooks'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts'
import { Text } from 'components'

const { useBreakpoint } = Grid

const ImagesPreview = (props) => {
  const { productName, productId, mediaObjects = [] } = props

  const { t } = useTranslations()
  const { sm, md } = useBreakpoint()
  const router = useRouter()

  const { config, count, showCount } = useGetImagesPreviewConfig(mediaObjects)

  const computedButtonText = sm ? t('Show all photos') : t('Photos')

  const handleShowAllPhotos = () => router.push(`/products/${productId}/images`)

  return (
    <ImagesPreviewWrapper sm={sm} md={md}>
      <MainImageWrapper sm={sm}>
        <Image
          height="100%"
          width="100%"
          src={config?.main}
          alt={productName}
          onClick={handleShowAllPhotos}
          preview={false}
          loading="lazy"
        />
        <Button onClick={handleShowAllPhotos}>{computedButtonText}</Button>
      </MainImageWrapper>

      {config?.small?.length ? (
        <SmallImagesPreviewWrapper sm={sm}>
          {config?.small?.map((src, index) => {
            const isLastImage = index === config?.small?.length - 1
            const label = `+${count}`

            return (
              <SmallImagePreview
                length={config?.small?.length}
                key={`${src}-${index}`}
                sm={sm}
                onClick={handleShowAllPhotos}>
                {isLastImage && showCount && (
                  <CountImagesWrapper>
                    <Text className="count-images">{label}</Text>
                  </CountImagesWrapper>
                )}

                <Image
                  preview={false}
                  src={src}
                  alt={productName}
                  height="100%"
                  width="100%"
                  loading="lazy"
                />
              </SmallImagePreview>
            )
          })}
        </SmallImagesPreviewWrapper>
      ) : null}
    </ImagesPreviewWrapper>
  )
}

export default ImagesPreview
