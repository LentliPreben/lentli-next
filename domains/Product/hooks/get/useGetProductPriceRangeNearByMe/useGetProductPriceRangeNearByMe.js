import _ from 'lodash'
import { useMemo } from 'react'

const useGetProductPriceRangeNearByMe = (nearByMeProducts = []) =>
  useMemo(() => {
    const sortedProducts = _.sortBy(nearByMeProducts, 'pricePerDayWithFees')

    return {
      minPrice: sortedProducts?.[0]?.pricePerDayWithFees || 0,
      maxPrice:
        sortedProducts?.[sortedProducts?.length - 1]?.pricePerDayWithFees || 0
    }
  }, [nearByMeProducts])

export default useGetProductPriceRangeNearByMe
