import { COLLECTIONS } from '__constants__'
import { doc } from 'firebase/firestore'
import { firestore } from 'services/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'

const useGetAddress = ({ addressId }) => {
  const query = addressId && doc(firestore, COLLECTIONS.ADDRESSES, addressId)

  return useDocumentData(query)
}

export default useGetAddress
