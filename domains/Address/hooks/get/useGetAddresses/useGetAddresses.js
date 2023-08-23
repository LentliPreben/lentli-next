import { COLLECTIONS } from '__constants__'
import { useCollection } from 'services/api/firebase'
import { useMemo } from 'react'

/**
 * It returns an array of values that are used to render the addresses
 * @param props - An object that contains the query parameters.
 * @returns An array of values.
 */
const useGetAddresses = (props) => {
  /* Query for getting collection reference */
  const query = useMemo(
    () => ({ ref: COLLECTIONS.ADDRESSES, ...props }),
    [props]
  )

  /* Getting collection data */
  return useCollection(query)
}

export default useGetAddresses
