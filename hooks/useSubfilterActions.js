import { useCallback, useMemo } from 'react'

import { getUpdatedFilterArray } from 'domains/Product/helpers'
import { useEvent } from 'hooks'

const LS_LABEL = 'details-visibility'

const useSubfilterActions = (params) => {
  const { filterParams, setFilterParams, fieldName, operand, isField } = params

  const onToggleDetails = useEvent((type) => {
    const currentState = localStorage.getItem(`${type}-${LS_LABEL}`)
    if (!currentState || currentState === 'closed') {
      localStorage.setItem(`${type}-${LS_LABEL}`, 'opened')
    } else {
      localStorage.setItem(`${type}-${LS_LABEL}`, 'closed')
    }
  })

  const checkIsEnabled = useCallback(
    (data) => {
      if (!filterParams) {
        return false
      }

      return Object.values(filterParams).some((query) => {
        if (Array.isArray(query)) {
          return query.includes(isField ? data : data._id)
        } else if (typeof query === 'string') {
          return query.includes(isField ? data : data._id.toString())
        } else if (typeof query === 'number') {
          return query === (isField ? data : data._id)
        }
        return false // Default case if query is not an array, string, or number
      })
    },
    [filterParams, isField]
  )

  const onChange = useEvent((data) => {
    // range is used for pricePerDay, for example
    // returns value like { pricePerDay: [2..299] }
    if (operand === 'range') {
      setFilterParams((prev) => ({
        ...prev,
        [fieldName]: `${data?.[0]}..${data?.[1]}`
      }))
    } else if (operand === 'slider') {
      setFilterParams((prev) => ({
        ...prev,
        [fieldName]: data
      }))
    }
    // array-contains is used for brandId, for example
    // returns value like { brandId: [brandId_1, brandId_2, brandId_3] }
    else if (operand === 'array-contains') {
      setFilterParams((prev) => {
        let newValues = {}
        let prevFieldValue = prev?.[fieldName] || []

        // if brand was selected - add it to array
        // else remove from array
        const newArray = getUpdatedFilterArray(prevFieldValue, isField, data)

        newValues = {
          ...prev,
          [fieldName]: newArray
        }

        return newValues
      })
    } else if (operand === 'object-has') {
      setFilterParams((prev) => {
        let newValues = {}
        let prevFieldValue = prev?.[fieldName] || []

        // if field was selected - add it to array
        // else remove from array
        const newArray = getUpdatedFilterArray(prevFieldValue, isField, data)

        newValues = {
          ...prev,
          [fieldName]: newArray
        }

        return newValues
      })
    }
  })

  return useMemo(
    () => ({ onChange, checkIsEnabled, onToggleDetails }),
    [onChange, checkIsEnabled, onToggleDetails]
  )
}

export default useSubfilterActions
