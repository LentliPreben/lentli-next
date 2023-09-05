import { useEffect, useState } from 'react'

import { getTopLevelCategories } from 'domains/Category/helpers'

const useGetTopLevelCategories = () => {
  const [filteredCategories, setFilteredCategories] = useState([])
  const [topLevelCategories, setTopLevelCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState([])

  useEffect(() => {
    const getTopCategories = async () => {
      try {
        const [filteredCategories, topLevelCategories, subCategories] =
          await getTopLevelCategories()
        setFilteredCategories(filteredCategories)
        setTopLevelCategories(topLevelCategories)
        setSubCategories(subCategories)
      } catch (error) {
        console.error('Error during fetching filter categories', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getTopCategories()
  }, [])

  return {
    topLevelCategories,
    filteredCategories,
    subCategories,
    loading,
    error
  }
}

export default useGetTopLevelCategories
