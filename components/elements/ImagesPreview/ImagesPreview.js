import Image from 'next/image'
import {
  CountImagesWrapper,
  ImagesPreviewWrapper,
  MainImageWrapper,
  SmallImagePreview,
  SmallImagesPreviewWrapper,
  buttonStyle
} from './ImagesPreview.styled'

import useGetImagesPreviewConfig from 'domains/Product/hooks/get/useGetImagesPreviewConfig'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts'
import { Text, Button } from 'components'
import { useBreakpoint } from 'hooks'

const ImagesPreview = (props) => {
  const { productName, productId, mediaObjects = [] } = props

  const { t } = useTranslations()
  const { xs, sm, md } = useBreakpoint()
  const router = useRouter()

  const { config, count, showCount } = useGetImagesPreviewConfig(mediaObjects)

  const computedButtonText = sm ? t('Show all photos') : t('Photos')

  const handleShowAllPhotos = () => router.push(`/products/${productId}/images`)

  return (
    <ImagesPreviewWrapper sm={sm} md={md}>
      <MainImageWrapper sm={sm}>
        <Image
          layout="fill"
          src={config?.main}
          alt={productName}
          onClick={handleShowAllPhotos}
          loading="lazy"
        />
        <Button style={buttonStyle} onClick={handleShowAllPhotos}>
          {computedButtonText}
        </Button>
      </MainImageWrapper>

      {config?.small?.length ? (
        <SmallImagesPreviewWrapper xs={xs} sm={sm}>
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
                  src={src}
                  alt={productName}
                  layout="fill"
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
