import {
  useGetProductTagsData,
  useGetProductMediaObjectsData
} from 'domains/Product/hooks'

import { COLLECTIONS } from '__constants__'
import { doc } from 'firebase/firestore'
import { firestore } from 'services/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useGetAddress } from 'domains/Address/hooks'
import { useLoading } from 'hooks'
import { useMemo } from 'react'
import { useGetBrand } from 'domains/Brand/hooks'
import { useGetUser } from 'domains/User/hooks'
import { useGetReviews } from 'domains/Review/hooks'
import { useGetAverageProductRating } from 'domains/Rating/hooks'

const useGetProductInitialValues = ({ productId }) => {
  const docRef = productId && doc(firestore, COLLECTIONS.PRODUCTS, productId)

  const [product, productLoading] = useDocumentData(docRef)

  const [mediaObjects, mediaObjectsLoading] =
    useGetProductMediaObjectsData(product)
  const [tags, tagsLoading] = useGetProductTagsData(product)
  const [address, addressLoading] = useGetAddress({
    addressId: product?.addressId
  })
  const [brand, brandLoading] = useGetBrand({ brandId: product?.brandId })
  const [user, userLoading] = useGetUser({ userId: product?._createdBy })
  const [rating, ratingLoading] = useGetAverageProductRating(productId)
  const [reviews, reviewsLoading] = useGetReviews(productId)

  const initialValues = useMemo(
    () => ({
      product,
      mediaObjects: mediaObjects?.filter(Boolean),
      tags,
      address,
      brand,
      user,
      rating,
      reviews
    }),
    [product, mediaObjects, tags, address, brand, user, rating, reviews]
  )

  const loadings = useMemo(
    () =>
      productId
        ? [
            productLoading,
            mediaObjectsLoading,
            tagsLoading,
            addressLoading,
            brandLoading,
            userLoading,
            ratingLoading,
            reviewsLoading
          ]
        : [],
    [
      productId,
      productLoading,
      mediaObjectsLoading,
      tagsLoading,
      addressLoading,
      brandLoading,
      userLoading,
      ratingLoading,
      reviewsLoading
    ]
  )

  const loading = useLoading(loadings)

  return [initialValues, loading]
}

export default useGetProductInitialValues
