import { useState, useEffect, useMemo } from 'react'
import throttle from 'lodash.throttle'

const breakpoints = {
  xs: 575,
  sm: 767,
  md: 991,
  lg: 1199,
  xl: 1399,
  xxl: 1600
}

// temporary solution (needs refactor) in order to simulate the behavior of the hook from antd useBreakpoints
const breakPointMap = {
  xs: { xs: true, sm: false, md: false, lg: false, xl: false, xxl: true },
  sm: { xs: false, sm: true, md: false, lg: false, xl: false, xxl: true },
  md: { xs: false, sm: true, md: true, lg: false, xl: false, xxl: true },
  lg: { xs: false, sm: true, md: true, lg: true, xl: false, xxl: false },
  xl: { xs: false, sm: true, md: true, lg: true, xl: true, xxl: false },
  xxl: { xs: false, sm: true, md: true, lg: true, xl: true, xxl: true }
}
const getDeviceConfig = (width) => {
  for (const [size, max] of Object.entries(breakpoints)) {
    if (width <= max) {
      return size
    }
  }
}

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState()

  const currentBreakpointMap = breakPointMap?.[brkPnt] || breakPointMap.sm

  const isSmallScreen = useMemo(
    () => !currentBreakpointMap.lg,
    [currentBreakpointMap.lg]
  )
  const isExtraSmallScreen = useMemo(
    () => !currentBreakpointMap.sm,
    [currentBreakpointMap.sm]
  )

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth) || 'xxl')
    }, 200)

    calcInnerWidth()
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])

  return {
    ...currentBreakpointMap,
    currentScreen: brkPnt,
    isSmallScreen,
    isExtraSmallScreen
  }
}
export default useBreakpoint
