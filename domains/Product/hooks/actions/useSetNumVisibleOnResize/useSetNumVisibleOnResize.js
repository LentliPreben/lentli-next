import { useEffect } from 'react'

// Custom hook to update numVisible based on viewport width
const useSetNumVisibleOnResize = (setNumVisible, productWidth) => {
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth
      setNumVisible(Math.floor(viewportWidth / productWidth))
    }

    // Initialize numVisible on first render
    handleResize()
  }, [productWidth, setNumVisible])
}

export default useSetNumVisibleOnResize
