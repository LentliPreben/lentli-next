import { useCallback, useEffect, useState, useMemo } from 'react'

// Define a custom hook that returns a state and a function to update it.
const useStateWithStorage = (initialValue, fieldName) => {
  const [state, setState] = useState(initialValue)

  // Function which takes a new value and updates the state.
  const handleChange = useCallback(
    (param) => {
      if (typeof param === 'function') {
        setState((previousState) => {
          const _value = param(previousState)
          fieldName && localStorage?.setItem(fieldName, JSON.stringify(_value))
          return _value
        })
      } else {
        setState(param)
        fieldName && localStorage?.setItem(fieldName, JSON.stringify(param))
      }
    },
    [fieldName]
  )
  useEffect(() => {
    const json = fieldName && window?.localStorage?.getItem?.(fieldName)
    setState(json ? JSON.parse(json) : initialValue)
  }, [fieldName, initialValue])

  return useMemo(() => [state, handleChange], [state, handleChange])
}

export default useStateWithStorage
