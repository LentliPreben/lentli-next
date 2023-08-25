import { getDocument } from 'services/api/firebase'
import { COLLECTIONS } from '__constants__'

const getBrand = async (brandId) => {
  try {
    if (brandId) {
      const brand = await getDocument(COLLECTIONS.BRANDS, brandId)

      return brand
    } else return {}
  } catch (error) {
    console.error(error)
  }
}

export default getBrand
