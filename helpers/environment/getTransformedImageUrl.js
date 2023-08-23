const getTransformedImageUrl = (previewImage, size = 576, format = 'jpeg') => {
  if (!previewImage) return null

  return (
    previewImage?.[format]?.[size] ||
    previewImage?.[format]?.original ||
    previewImage?.url
  )
}

export default getTransformedImageUrl
