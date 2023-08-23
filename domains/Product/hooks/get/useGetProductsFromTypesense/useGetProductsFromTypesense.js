import { getDocuments } from 'modules/typesense-module/helpers'
import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'contexts'
import { COLLECTIONS } from 'modules/typesense-module/__constants__'

const useGetProductsFromTypesense = (props) => {
  const { categoryId, globalSearchValue } = props

  const { t } = useTranslations()

  const [productIdsToShow, setProductsIdsToShow] = useState()
  const [loading, setLoading] = useState(true)
  const [filterParams, setFilterParams] = useState({})
  const [searchValue, setSearchValue] = useState('*')

  const fetchProducts = useCallback(async () => {
    // filterParams looks like { brandId: [brandId_1, brandId_2],
    //                           pricePerDay: '2..299',
    //                           fields: {
    //                              'Ram type': ['DDR-3', 'DDR-4'],
    //                              'GPU type': ['Integrated']
    //                             }
    //                         }

    const modifiedFilterParams = {
      brandId: filterParams?.brandId,
      pricePerDay: filterParams?.pricePerDay
    }

    if (filterParams?.fields && Object.keys(filterParams.fields)?.length) {
      for (const field in filterParams.fields) {
        modifiedFilterParams[`fields.${field}`] = filterParams.fields[field]
      }
    }

    const queryArray = Object.keys(modifiedFilterParams)
      ?.filter((key) => !!modifiedFilterParams?.[key]?.length)
      ?.map((key) => `${key}:[${modifiedFilterParams?.[key]}]`)

    // query looks like
    // brandId:[brandId_1, brandId_2] && fields.GPU type:[Integrated] && fields.Ram type:[DDR-3, DDR-4] && pricePerDay:[2..299]
    const query = queryArray.join(' && ')

    const searchQuery = {
      q: globalSearchValue || searchValue, // search value from input or ignore search value to use only filter_by, filter_by and search value also can be used in combination
      query_by: 'fullTextSearch', // field to search by
      filter_by: query,
      prefix: true,
      infix: 'fallback',
      // filter_by: query
      // ALSO TO QUERY we have to pass all fields
      page: 1,
      per_page: 20
    }
    const searchResults = await getDocuments(
      categoryId ? `products_${categoryId}` : COLLECTIONS.PRODUCTS,
      searchQuery
    )

    setProductsIdsToShow(searchResults?.map(({ _id }) => _id))
  }, [filterParams, globalSearchValue, searchValue, categoryId])

  useEffect(() => {
    const typesenseFunc = async () => {
      try {
        setLoading(true)
        fetchProducts()
      } catch (e) {
        console.error(t('Something went wrong during typesense action'))
      } finally {
        setLoading(false)
      }
    }

    typesenseFunc()
    // t function inside dependencies create loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts])

  return [
    productIdsToShow,
    loading,
    setSearchValue,
    filterParams,
    setFilterParams
  ]
}

export default useGetProductsFromTypesense
