import { PageLayout } from 'components'

import { NearBeMap } from 'domains/GoogleMaps/components'
import { NearProductsList } from 'domains/Product/components'
import { FilterProvider } from 'contexts'

const Home = () => {
  return (
    <FilterProvider>
      <PageLayout fullWidth fullHeight>
        <NearBeMap />
        <NearProductsList />
      </PageLayout>
    </FilterProvider>
  )
}

export default Home
