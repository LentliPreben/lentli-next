import { getDocument } from 'services/api/firebase'
import { COLLECTIONS } from '__constants__'

const getAddress = async (productId) => {
  try {
    if (productId) {
      const address = await getDocument(COLLECTIONS.ADDRESSES, productId)

      return address
    } else return {}
  } catch (error) {
    console.error(error)
  }
}

export default getAddress
