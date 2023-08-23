import { useCallback, useEffect, useRef } from 'react'

// changed this hook to prevent horizontal scroll switch from X to Y  when using trackpad
const useHorizontalScroll = () => {
  const touchRef = useRef(false)
  const nodeRef = useRef()

  const handleScroll = useCallback((event) => {
    // If we think this is a trackpad event, don't preventDefault and stop here
    if (touchRef.current) return

    event.preventDefault()
    if (nodeRef.current) {
      nodeRef.current.scrollLeft += event.deltaY
    }
  }, [])

  const handleWheel = useCallback((event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      touchRef.current = true
    } else {
      touchRef.current = false
    }
  }, [])

  const handleMouseEnter = useCallback(
    (event) => {
      if (nodeRef.current) {
        nodeRef.current.addEventListener('wheel', handleWheel)
        nodeRef.current.addEventListener('wheel', handleScroll)
      }
    },
    [handleScroll, handleWheel]
  )

  const handleMouseLeave = useCallback(
    (event) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener('wheel', handleWheel)
        nodeRef.current.removeEventListener('wheel', handleScroll)
      }
      // Reset this flag when the mouse leaves
      touchRef.current = false
    },
    [handleScroll, handleWheel]
  )

  useEffect(() => {
    const el = nodeRef.current

    return () => {
      if (el) {
        el.removeEventListener('wheel', handleWheel)
        el.removeEventListener('wheel', handleScroll)
      }
    }
  }, [handleScroll, handleWheel])

  return [nodeRef, handleMouseEnter, handleMouseLeave]
}

export default useHorizontalScroll
