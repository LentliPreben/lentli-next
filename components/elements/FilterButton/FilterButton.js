import { useBreakpoint } from 'hooks'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { ProductFilter, NearByMeFilter } from 'domains/Product/components'
import { useTranslations } from 'contexts'
import filterLines from 'public/assets/filterLines.svg'
import Image from 'next/image'
import { Button, Drawer } from 'components'

const FilterButton = (props) => {
  const {
    position,
    category,
    filterVisibility,
    setSearchRadius,
    searchRadius
  } = props

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const { t } = useTranslations()
  const { xs, isSmallScreen } = useBreakpoint()

  const toggleFilter = () => setIsFilterOpen((prev) => !prev)

  return (
    <div style={{ position, top: xs ? 70 : 32, right: xs ? 20 : 52 }}>
      <Button
        size="md"
        onClick={toggleFilter}
        icon={<Image src={filterLines} alt={t('Filter')} />}>
        {isSmallScreen ? null : t('Filter')}
      </Button>
      <Drawer onClose={toggleFilter} title={t('Filter')} open={isFilterOpen}>
        {category ? (
          <ProductFilter
            category={category}
            filterVisibility={filterVisibility}
          />
        ) : (
          <NearByMeFilter
            filterVisibility={filterVisibility}
            setSearchRadius={setSearchRadius}
            searchRadius={searchRadius}
          />
        )}
      </Drawer>
    </div>
  )
}

FilterButton.propTypes = {
  position: PropTypes.string,
  category: PropTypes.object,
  filterVisibility: PropTypes.bool,
  setSearchRadius: PropTypes.func,
  searchRadius: PropTypes.number
}

export default FilterButton
