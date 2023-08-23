import { useCallback, useMemo } from 'react'

import { useSearchProductsByCategory } from 'domains/Product/hooks'
import { useRouter } from 'next/router'

const useProductSearch = () => {
  const searchParams = useMemo(
    () => ({ perPage: 3, initialSearchValue: null }),
    []
  )

  const { products, setSearchValue } = useSearchProductsByCategory(searchParams)
  const router = useRouter()

  const onReset = useCallback(() => setSearchValue(null), [setSearchValue])
  const onSelect = useCallback(
    (productId) => {
      if (!productId) return
      router.push(`/products/${productId}`)
    },
    [router]
  )

  return useMemo(
    () => ({
      data: products || [],
      onChange: setSearchValue,
      onReset,
      onSelect
    }),
    [products, setSearchValue, onReset, onSelect]
  )
}

export default useProductSearch
