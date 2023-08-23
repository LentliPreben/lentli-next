import { doc, getDoc } from 'firebase/firestore'

import { firestore } from 'services/firebase'
import { notification } from 'antd'

const checkIfDocumentExist = async (_id, collection, messageError) => {
  try {
    const docRef = doc(firestore, collection, _id)
    const docSnapshot = await getDoc(docRef)
    return docSnapshot?.exists()
  } catch (error) {
    notification.error({
      message: messageError,
      description: error.message
    })
  }
}

export default checkIfDocumentExist
