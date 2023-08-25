import { getDocument } from 'services/api/firebase'
import { COLLECTIONS } from '__constants__'
import { getAddress } from 'domains/Address/helpers'
import { getTagsByIds } from 'domains/Tag/helpers'
import { getBrand } from 'domains/Brand/helpers'
import { getUser } from 'domains/User/helpers'
import { getMediaObjectsByIds } from 'domains/MediaObject/helpers'
import { getAverageProductRating } from 'domains/Rating/helpers'
import { getProductsByUser } from 'domains/Product/helpers'
import { getReviews } from 'domains/Review/helpers'

const getProductInitialValues = async (productId) => {
  try {
    const product = await getDocument(COLLECTIONS.PRODUCTS, productId)

    const [
      tags,
      address,
      brand,
      user,
      mediaObjects,
      averageProductRating,
      reviews,
      productsByCurrentLessor
    ] = await Promise.all([
      getTagsByIds(product?.tags),
      getAddress(product?.addressId),
      getBrand(product?.brandId),
      getUser(product?._createdBy),
      getMediaObjectsByIds(product?.mediaObjects),
      getAverageProductRating(productId),
      getReviews(productId),
      getProductsByUser(product?._createdBy, {
        exceptCurrentProduct: true,
        currentProductId: productId
      })
    ])

    return {
      product,
      tags,
      address,
      brand,
      user,
      mediaObjects,
      averageProductRating,
      reviews,
      productsByCurrentLessor
    }
  } catch (error) {
    console.error(error)
  }
}

export default getProductInitialValues
