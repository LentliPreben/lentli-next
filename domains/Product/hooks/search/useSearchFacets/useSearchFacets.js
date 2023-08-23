import { useCallback, useEffect, useMemo, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { getDocuments } from 'modules/typesense-module/helpers'
import { useHandleError } from 'hooks'
import { useTranslations } from 'contexts'

const useSearchFacets = (props) => {
  const { categoryId, facet_by } = useMemo(() => props || {}, [props])

  const handleError = useHandleError()
  const { t } = useTranslations()

  const [loading, setLoading] = useState(true)
  const [facets, setFacets] = useState()

  const fetchFacets = useCallback(async () => {
    const searchQuery = {
      q: '*',
      query_by: 'name',
      prefix: true,
      infix: 'fallback',
      page: 1,
      per_page: 0,
      facet_by: facet_by
    }
    const { facets } = await getDocuments(
      categoryId ? `products_${categoryId}` : COLLECTIONS.PRODUCTS,
      searchQuery
    )

    setFacets(facets)
  }, [categoryId, facet_by])

  useEffect(() => {
    const typesenseFunc = async () => {
      try {
        setLoading(true)
        await fetchFacets()
      } catch (e) {
        handleError(e, t('Something went wrong during search'))
      } finally {
        setLoading(false)
      }
    }

    categoryId && typesenseFunc()

    // t and handleError functions inside dependencies create loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFacets, categoryId])

  return useMemo(() => ({ loading, facets }), [loading, facets])
}

export default useSearchFacets
