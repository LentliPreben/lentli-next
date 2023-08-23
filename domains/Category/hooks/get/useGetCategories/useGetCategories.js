import { COLLECTIONS } from '__constants__'
import { useCollection } from 'services/api/firebase'
import { useMemo } from 'react'

/**
 * It returns an array of values that are used to render the categories
 * @param props - An object that contains the query parameters.
 * @returns An array of values.
 */
const useGetCategories = (props) => {
  /* Query for getting collection reference */
  const query = useMemo(
    () => ({ ref: COLLECTIONS.CATEGORIES, ...props }),
    [props]
  )

  /* Getting collection data */
  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection(query)

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}

export default useGetCategories
