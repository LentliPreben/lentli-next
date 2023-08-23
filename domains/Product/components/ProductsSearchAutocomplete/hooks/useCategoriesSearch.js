import { useCallback, useMemo, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import { useCollection } from 'services/api/firebase'
import { useRouter } from 'next/router'

const useCategoriesSearch = () => {
  const [searchValue, setSearchValue] = useState()
  const router = useRouter()

  const query = useMemo(() => {
    if (!searchValue) return null

    return {
      ref: COLLECTIONS.CATEGORIES,
      limit: 3,
      orderBy: ['name'],
      where: [
        ['name', '>=', searchValue],
        ['name', '<=', searchValue + '\uf8ff']
      ]
    }
  }, [searchValue])

  const [data] = useCollection(query)

  const onReset = useCallback(() => setSearchValue(null), [])
  const onSelect = useCallback(
    (categoryId) => {
      if (!categoryId) return

      router.push(`/categories/${categoryId}/products`)
    },
    [router]
  )

  return useMemo(
    () => ({
      data: data || [],
      onChange: setSearchValue,
      onReset,
      onSelect
    }),
    [onReset, onSelect, setSearchValue, data]
  )
}

export default useCategoriesSearch
