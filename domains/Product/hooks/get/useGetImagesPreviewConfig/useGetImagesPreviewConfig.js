import { useCallback, useEffect, useMemo, useState } from 'react'

import { useBreakpoint } from 'hooks'

const COUNT_DISPLAYED_IMAGES = 4

const useGetImagesPreviewConfig = (mediaObjects) => {
  const { sm } = useBreakpoint()

  const mediaObjectsLength = useMemo(
    () => mediaObjects?.length || 0,
    [mediaObjects]
  )

  // Main src is used for the biggest image,
  // Small array is used for 3 images after main image
  const [config, setConfig] = useState({
    main: '',
    small: []
  })
  // Count of images
  const [count, setCount] = useState()
  const [showCount, setShowCount] = useState(false)

  const getConfig = useCallback((imagesArray) => {
    // Main image always is the first image in array
    const main = imagesArray?.[0]

    const small = [
      ...imagesArray?.slice(1, COUNT_DISPLAYED_IMAGES),
      ...imagesArray?.slice(1, COUNT_DISPLAYED_IMAGES)
    ]

    return { main, small }
  }, [])

  const setCountConfig = useCallback(() => {
    if (mediaObjectsLength <= COUNT_DISPLAYED_IMAGES) {
      setShowCount(false)
    } else {
      setShowCount(true)
      setCount(mediaObjectsLength - COUNT_DISPLAYED_IMAGES)
    }
  }, [mediaObjectsLength])

  useEffect(() => {
    // Get computed config, images for main and small preview
    const computedConfig = getConfig(mediaObjects)

    setConfig(computedConfig)
    setCountConfig()
  }, [getConfig, setCountConfig, mediaObjects, sm])

  return { config, count, showCount }
}

export default useGetImagesPreviewConfig
