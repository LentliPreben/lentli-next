import { Grid } from 'antd'
import { useMemo } from 'react'

const { useBreakpoint } = Grid

const useScreen = () => {
  const breakPoints = useBreakpoint()

  const isSmallScreen = useMemo(() => !breakPoints.lg, [breakPoints.lg])
  const isExtraSmallScreen = useMemo(() => !breakPoints.sm, [breakPoints.sm])
  return useMemo(
    () => ({ isSmallScreen, isExtraSmallScreen, ...breakPoints }),
    [isSmallScreen, isExtraSmallScreen, breakPoints]
  )
}

export default useScreen
