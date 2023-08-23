import { COLLECTIONS } from '__constants__'
import { doc } from 'firebase/firestore'
import { firestore } from 'services/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'

const useGetProduct = ({ productId }) => {
  const docRef = productId && doc(firestore, COLLECTIONS.PRODUCTS, productId)

  return useDocumentData(docRef)
}

export default useGetProduct
