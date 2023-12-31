import { useMemo } from 'react'

/**
 * It takes an array of booleans and returns true if any of them are true
 * @param loadings - This is an array of booleans or a single boolean.
 * @returns A boolean value that is true if any of the loadings are true.
 */
const useLoading = (loadings) =>
  useMemo(
    () =>
      loadings && Array.isArray(loadings)
        ? loadings?.reduce((acc, loading) => acc || loading, false)
        : loadings,
    [loadings]
  )

export default useLoading
