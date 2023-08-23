import { doc, getDoc } from 'firebase/firestore'

import { firestore } from 'services/firebase'

/**
 * It gets a document from a collection in Firestore
 * @param collectionPath - The path to the collection you want to get the document from.
 * @param id - The id of the document you want to get.
 * @returns The data from the document
 */
const getDocument = async (collectionPath, id) => {
  const ref = doc(firestore, collectionPath, id)
  const docSnapshot = await getDoc(ref)
  return docSnapshot.data()
}

export default getDocument
