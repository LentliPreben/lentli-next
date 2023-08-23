import { NearProductsWrapper } from './NearProductsList.styled'

import { NearByProductHorizontalList } from 'domains/Product/components'
import { useFilterContext } from 'contexts'

const NearProductsList = () => {
  const { filteredNearByProducts } = useFilterContext()

  return (
    <NearProductsWrapper>
      <NearByProductHorizontalList products={filteredNearByProducts} />
    </NearProductsWrapper>
  )
}

export default NearProductsList
