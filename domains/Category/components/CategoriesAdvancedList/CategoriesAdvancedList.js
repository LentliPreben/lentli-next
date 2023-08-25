import { useEffect, useMemo, useState } from 'react'

import { CategoryView } from 'domains/Category/components'

const CategoriesAdvancedList = (props) => {
  const { data, showAllCategoriesOption, type = 'horizontal' } = props

  const [groupedCategories, setGroupedCategories] = useState([])

  useEffect(() => {
    if (showAllCategoriesOption) {
      data?.unshift({
        name: 'All categories',
        imageUrl: '/assets/categories.png',
        key: 'allCategories'
      })
    }

    const pairArr = []

    for (let i = 0; i < data?.length; i += 2) {
      pairArr.push([data[i], data[i + 1]])
    }

    setGroupedCategories(pairArr)
  }, [data, showAllCategoriesOption])

  const RenderedList = () =>
    data?.map((group) => (
      <div className="categories-advanced-list-item" key={group?._id}>
        <CategoryView {...group} />
      </div>
    ))

  return type === 'horizontal' ? (
    <div className="categories-scrolled-container">
      <div className="categories-advanced-list">
        <RenderedList />
      </div>
    </div>
  ) : (
    <div className="categories-advanced-list">
      <RenderedList />
    </div>
  )
}

export default CategoriesAdvancedList
