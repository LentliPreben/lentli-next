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
const useSearchProducts = (props) => {
  const {
    perPage = 20,
    page = 1,
    initialSearchValue = '*',
    facet_by,
    subCategoryIds
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
    if (!searchValue || !subCategoryIds?.length) {
      setLoading(false)
      return setSearchState({ products: [], facets: null, totalResults: null })
    }
    // query looks like
    // brandId:[brandId_1, brandId_2] && fields.GPU type:[Integrated] && fields.Ram type:[DDR-3, DDR-4] && pricePerDay:[2..299]
    const subcategoriesQuery = subCategoryIds?.map(
      (category) => `categoryId:=${category}`
    )
    // added subcategoriesQuery to queryArray
    const query = subCategoryIds?.length && subcategoriesQuery?.join(' || ')

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
      COLLECTIONS.PRODUCTS,
      searchQuery
    )
    setSearchState({
      products: documents,
      facets: facets,
      totalResults: totalSearchResults
    })
  }, [searchValue, subCategoryIds, page, perPage, facet_by])

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

export default useSearchProducts
