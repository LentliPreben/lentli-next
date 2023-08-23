import { useCallback, useEffect, useMemo, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { getDocuments } from 'modules/typesense-module/helpers'
import { useHandleError } from 'hooks'
import { useTranslations } from 'contexts'

// filterParams looks like:
// {
//   brandId: [brandId_1, brandId_2],
//   pricePerDay: '2..299',
//   fields.Ram type: ['DDR-3', 'DDR-4']
//   fields.GPU type: ['Integrated']
// }
const useSearchAllProducts = (props) => {
  const { perPage = 20, page = 1, initialSearchValue = '*' } = props

  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const [loading, setLoading] = useState(true)
  const [searchState, setSearchState] = useState({
    products: [],
    totalResults: null
  })

  const handleError = useHandleError()
  const { t } = useTranslations()
  const [filterParams, setFilterParams] = useState({})

  const fetchProducts = useCallback(async () => {
    const searchQuery = {
      q: searchValue, // search value from input or ignore search value to use only filter_by, filter_by and search value also can be used in combination
      query_by: 'fullTextSearch', // field to search by
      prefix: true,
      infix: 'fallback',
      page: page,
      per_page: perPage
    }

    const { documents, totalSearchResults } = await getDocuments(
      COLLECTIONS.PRODUCTS,
      searchQuery
    )
    setSearchState({
      products: documents,
      totalResults: totalSearchResults
    })
  }, [searchValue, page, perPage])

  useEffect(() => {
    const typesenseFunc = async () => {
      try {
        setLoading(true)
        await fetchProducts()
      } catch (e) {
        handleError(e, t('Something went wrong during search'))
      } finally {
        setLoading(false)
      }
    }

    typesenseFunc()

    // t and handleError functions inside dependencies create loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts])

  const productIds = useMemo(
    () => searchState.products?.map(({ _id }) => _id) || [],
    [searchState.products]
  )

  return useMemo(
    () => ({
      productIds,
      loading,
      setSearchValue,
      filterParams,
      setFilterParams,
      ...searchState
    }),
    [productIds, loading, searchState, filterParams, setFilterParams]
  )
}

export default useSearchAllProducts
