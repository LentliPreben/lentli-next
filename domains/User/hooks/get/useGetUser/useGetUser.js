import { COLLECTIONS } from '__constants__'
import { doc } from 'firebase/firestore'
import { firestore } from 'services/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useMemo } from 'react'

const useGetUser = ({ userId }) => {
  const querySnapshot = useMemo(
    () => (userId ? doc(firestore, COLLECTIONS.USERS, userId) : null),
    [userId]
  )
  return useDocumentData(querySnapshot)
}

export default useGetUser
