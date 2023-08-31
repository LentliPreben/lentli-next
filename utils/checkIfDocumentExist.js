import { doc, getDoc } from 'firebase/firestore'

import { firestore } from 'services/firebase'
import { notification } from 'utils'

const checkIfDocumentExist = async (_id, collection, messageError) => {
  try {
    const docRef = doc(firestore, collection, _id)
    const docSnapshot = await getDoc(docRef)
    return docSnapshot?.exists()
  } catch (error) {
    notification({
      type: 'error',
      title: messageError,
      description: error.message
    })
  }
}

export default checkIfDocumentExist
