import { Button, Grid, Image, Typography, theme } from 'antd'
import {
  CountImagesWrapper,
  ImagesPreviewWrapper,
  MainImageWrapper,
  SmallImagePreview,
  SmallImagesPreviewWrapper
} from './ImagesPreview.styled'

import { Icon } from '@qonsoll/icons'
import { useGetImagesPreviewConfig } from 'domains/Product/hooks'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts'

const { useBreakpoint } = Grid

const ImagesPreview = (props) => {
  const { productName, productId, mediaObjects = [] } = props

  const { t } = useTranslations()
  const { sm, md, xl } = useBreakpoint()
  const { colorPrimaryActive } = theme.useToken().token
  const router = useRouter()

  const { config, count, showCount } = useGetImagesPreviewConfig(mediaObjects)

  const computedButtonText = sm ? t('Show all photos') : t('Photos')

  const handleShowAllPhotos = () => router.push(`/products/${productId}/images`)

  return (
    <ImagesPreviewWrapper sm={sm} md={md}>
      <MainImageWrapper colorPrimaryActive={colorPrimaryActive} sm={sm}>
        <Image
          height="100%"
          width="100%"
          src={config?.main}
          alt={productName}
          onClick={handleShowAllPhotos}
          preview={false}loading="lazy"
        />
        <Button
          icon={<Icon name="DotsGridOutlined" size={16} />}
          onClick={handleShowAllPhotos}>
          {computedButtonText}
        </Button>
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
                    <Typography.Text className="count-images">
                      {label}
                    </Typography.Text>
                  </CountImagesWrapper>
                )}

                <Image
                  preview={false}
                  src={src}
                  alt={productName}
                  height="100%"
                  width="100%"loading="lazy"
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
