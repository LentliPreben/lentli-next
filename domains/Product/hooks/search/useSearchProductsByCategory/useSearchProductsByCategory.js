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
const useSearchProductsByCategory = (props) => {
  const {
    categoryId,
    perPage = 20,
    page = 1,
    initialSearchValue = '*',
    facet_by
  } = useMemo(() => props || {}, [props])

  const handleError = useHandleError()
  const { t } = useTranslations()
  const [filterParams, setFilterParams] = useState({})
  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const [loading, setLoading] = useState(true)
  const [searchState, setSearchState] = useState({
    products: [],
    facets: null,
    totalResults: null
  })
  const fetchProducts = useCallback(async () => {
    // added condition to dont run this hook if current page we are isn't products from exact category
    if (!searchValue) {
      setLoading(false)
      return setSearchState({ products: [], facets: null, totalResults: null })
    }
    const queryArray = Object.keys(filterParams)
      ?.filter((key) => !!filterParams?.[key]?.length)
      ?.map((key) => `${key}:[${filterParams?.[key]}]`)

    // query looks like
    // brandId:[brandId_1, brandId_2] && fields.GPU type:[Integrated] && fields.Ram type:[DDR-3, DDR-4] && pricePerDay:[2..299]
    const query = queryArray.join(' && ')
    const searchQuery = {
      q: searchValue, // search value from input or ignore search value to use only filter_by, filter_by and search value also can be used in combination
      query_by: 'fullTextSearch', // field to search by
      filter_by: query,
      prefix: true,
      infix: 'fallback',
      // filter_by: query
      // ALSO TO QUERY we have to pass all fields
      page: page,
      per_page: perPage,
      facet_by: facet_by
    }

    const { documents, facets, totalSearchResults } = await getDocuments(
      categoryId ? `products_${categoryId}` : COLLECTIONS.PRODUCTS,
      searchQuery
    )
    setSearchState({
      products: documents,
      facets: facets,
      totalResults: totalSearchResults
    })
  }, [searchValue, filterParams, page, perPage, facet_by, categoryId])

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
      searchValue,
      ...searchState
    }),
    [productIds, loading, filterParams, searchValue, searchState]
  )
}

export default useSearchProductsByCategory
