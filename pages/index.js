import { PageLayout } from 'components'

import { NearBeMap } from 'domains/GoogleMaps/components'
import { NearProductsList } from 'domains/Product/components'
import { FilterProvider } from 'contexts'
import { getTopLevelCategories } from 'domains/Category/helpers'

const Home = (props) => {
  const { topLevelCategoriesJSON } = props

  const topLevelCategories = JSON.parse(topLevelCategoriesJSON)

  return (
    <FilterProvider>
      <PageLayout fullWidth fullHeight topLevelCategories={topLevelCategories}>
        <NearBeMap />
        <NearProductsList />
      </PageLayout>
    </FilterProvider>
  )
}

export default Home

export async function getServerSideProps(props) {
  try {
    const topLevelCategories = await getTopLevelCategories()
    const topLevelCategoriesJSON = JSON.stringify(topLevelCategories || {})

    return {
      props: { topLevelCategoriesJSON }
    }
  } catch (error) {
    console.error(error)
  }
}
