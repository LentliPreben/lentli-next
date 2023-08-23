import { ENDPOINTS } from '__constants__'

const API_URL = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_API_URL

const updateUserViewsStatistics = async (product) => {
  try {
    const path = `${API_URL}/${ENDPOINTS.UPDATE_USER_VIEWS_STATISTICS}`
    const body = {
      productId: product?._id,
      renterId: product?._createdBy
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    const response = await fetch(path, fetchObj)

    if (!response?.ok) {
      console.error('ERROR on user-views statistic update', description)
    }
    return await response.json()
  } catch (error) {
    console.error('ERROR on user-views statistic update', error)
  }
}

export default updateUserViewsStatistics
