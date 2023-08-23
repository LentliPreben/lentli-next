import { Grid } from 'antd'

const { useBreakpoint } = Grid

const useCurrentScreen = () => {
  const breakPoints = useBreakpoint()

  function getLastKeyWithTrueValue(obj) {
    const keys = Object.keys(obj)

    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i]
      if (obj[key] === true) {
        return key
      }
    }

    return undefined // If no true value is found, return undefined
  }

  const currentScreen = getLastKeyWithTrueValue(breakPoints)

  return currentScreen
}

export default useCurrentScreen
