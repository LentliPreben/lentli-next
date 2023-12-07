import PropTypes from 'prop-types'
import { isEmptyObject } from 'utils'
import { memo } from 'react'
import { useGetCategories } from 'domains/Category/hooks'
import { useTranslations } from 'contexts'
import { Text, Button, Divider, Tag } from 'components'
import TagsListWrapper from './ProductFilterList.styled'

const ProductFilterList = (props) => {
  const { filterParams, setFilterParams, brands, brandsLoading } = props
  const { t } = useTranslations()
  const [categories] = useGetCategories()

  const createTags = (key, values) => {
    if (key === 'pricePerDayWithFees') {
      const regex = /(\d+)\.\.(\d+)/ // Regular expression to match the numbers before and after the double dots

      const matches = values.match(regex) // Extract matches using regex
      if (matches && matches.length === 3) {
        const [, minPrice, maxPrice] = matches // Destructure the matched values

        return (
          <Tag
            className="mb-8"
            onClose={() => handleTagClose(key, values)}
            closable
            key={key}>
            {`${minPrice}-${maxPrice} NOK`}
          </Tag>
        )
      }
    }
    if (key === 'address.location') {
      const radius = values / 1000

      return (
        <Tag
          className="mb-8"
          onClose={() => handleTagClose(key, values)}
          closable
          key={key}>
          {`${radius}km`}
        </Tag>
      )
    }
    if (key === 'subcategoryId') {
      return values?.map((categoryId) => {
        const category = categories?.find(
          (category) => category?._id === categoryId
        )

        return (
          <Tag
            className="mb-8"
            onClose={() => handleTagClose(key, categoryId)}
            closable
            key={key}>
            {category?.name}
          </Tag>
        )
      })
    }

    return values?.map((value) => {
      const displayValue =
        key === 'brandId'
          ? brands?.find((brand) => brand._id === value)?.name || value
          : value

      return (
        <Tag
          className="mb-8"
          closable
          onClose={() => handleTagClose(key, value)}
          key={`${key}-${displayValue}`}>
          {`${displayValue}`}
        </Tag>
      )
    })
  }

  const handleResetFiltersAll = () => {
    setFilterParams({})
  }
  const handleTagClose = (key, value) => {
    const updatedFilterParams = JSON.parse(JSON.stringify(filterParams))
    if (key === 'pricePerDayWithFees' || key === 'address.location') {
      delete updatedFilterParams[key]
      return setFilterParams(updatedFilterParams)
    }

    if (key !== 'pricePerDayWithFees' && updatedFilterParams[key]) {
      updatedFilterParams[key] = updatedFilterParams[key].filter(
        (v) => v !== value
      )
      setFilterParams(updatedFilterParams)
    }
  }

  return (
    <>
      {!isEmptyObject(filterParams) && (
        <>
          <div className="flex align-center justify-between mb-12">
            <Text className="strong">{t('Selected')}</Text>

            <Button type="link" onClick={handleResetFiltersAll}>
              {t('Clear all')}
            </Button>
          </div>
          <TagsListWrapper>
            {!brandsLoading &&
              Object.entries(filterParams)?.map(([key, values]) =>
                createTags(key, values)
              )}
          </TagsListWrapper>
          <Divider className="my-4" />
        </>
      )}
    </>
  )
}
ProductFilterList.propTypes = {
  filterParams: PropTypes.object,
  setFilterParams: PropTypes.func,
  brands: PropTypes.array,
  brandsLoading: PropTypes.bool
}

export default memo(ProductFilterList)
