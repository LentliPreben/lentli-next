import _ from 'lodash'
import { useMemo } from 'react'

const useGetProductPriceRangeNearByMe = (nearByMeProducts = []) =>
  useMemo(() => {
    const sortedProducts = _.sortBy(nearByMeProducts, 'pricePerDay')

    return {
      minPrice: sortedProducts?.[0]?.pricePerDay || 0,
      maxPrice: sortedProducts?.[sortedProducts?.length - 1]?.pricePerDay || 0
    }
  }, [nearByMeProducts])

export default useGetProductPriceRangeNearByMe
