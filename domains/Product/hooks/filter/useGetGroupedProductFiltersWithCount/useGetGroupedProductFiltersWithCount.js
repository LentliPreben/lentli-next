import { useState, useEffect } from 'react'
import _ from 'lodash'
/**
 * Hook is used to get filters (like brandId,GPU type, Ram type) with count
 * @param   {array} products array with product's objects
 * @returns {[groupedFilters, loading]}
 */
const useGetGroupedProductFiltersWithCount = (products) => {
  const [groupedFilters, setGroupedFilters] = useState({})
  const [loading, setLoading] = useState(true)

  /* Input array is 
  [
    {
      name: 'Dyson',
      _id: '4cdsvre8cs',
      fields: [
        { name: 'Ram type', value: 'DDR-4' },
        { name: 'GPU type', value: 'Discrete' }
      ],
      brandId: 'hkjsh45s6vsdv'
    },
    {
      name: 'Air Pods3',
      _id: '45svre8',
      fields: [
        { name: 'GPU type', value: 'Integrated' },
      ],
      brandId: 's789vsdv465sd'
    },
    {
      name: 'Iphone 14 Pro Max',
      _id: 'cs6ve2ve',
      fields: [
        { name: 'Ram type', value: 'DDR-3' },
        { name: 'GPU type', value: 'Integrated' },
      ],
      brandId: 'hkjsh45s6vsdv'
    }
  ] */
  useEffect(() => {
    if (products) {
      setLoading(true)
      const groupedCount = _.chain(products)
        .flatMap('fields')
        .groupBy('name')
        .mapValues((group) => _.countBy(group, 'value'))
        .merge({
          brandId: _.countBy(products, 'brandId')
        })
        .value()

      setGroupedFilters(groupedCount)
      setLoading(false)
    }
  }, [products])
  /*  Output object is
    {
     'Ram type': {
       'DDR-4': 1,
       'DDR-3': 1
     },
     'GPU type': {
       'Discrete': 1,
       'Integrated': 2
     },
     brandId: {
        's789vsdv465sd': 1,
        'hkjsh45s6vsdv': 2
     }
    }
   */

  return [groupedFilters, loading]
}

export default useGetGroupedProductFiltersWithCount
