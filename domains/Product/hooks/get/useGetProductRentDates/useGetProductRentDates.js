import { getDatabase, ref } from 'firebase/database'
import { useMemo } from 'react'
import { RDB_COLLECTIONS } from '__constants__'
import { useObjectVal } from 'react-firebase-hooks/database'

const useGetProductRentDates = ({ productId }) => {
  const dbRef = ref(getDatabase(), `${RDB_COLLECTIONS.RENT_DATES}/${productId}`)
  const result = useObjectVal(dbRef)

  return useMemo(() => result, [result])
}

export default useGetProductRentDates
