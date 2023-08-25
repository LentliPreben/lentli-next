import { Button, Divider, Typography, theme } from 'antd'

import PropTypes from 'prop-types'
import { StyledTag } from './ProductFilterList.styled'
import { isEmptyObject } from 'utils'
import { memo } from 'react'
import { useGetCategories } from 'domains/Category/hooks'
import { useTranslations } from 'contexts'

const ProductFilterList = (props) => {
  const { filterParams, setFilterParams, brands, brandsLoading } = props
  const { t } = useTranslations()
  const [categories] = useGetCategories()
  const { colorPrimary } = theme.useToken().token
  const createTags = (key, values) => {
    if (key === 'pricePerDay') {
      const regex = /(\d+)\.\.(\d+)/ // Regular expression to match the numbers before and after the double dots

      const matches = values.match(regex) // Extract matches using regex
      if (matches && matches.length === 3) {
        const [, minPrice, maxPrice] = matches // Destructure the matched values

        return (
          <StyledTag
            className="mb-8"
            onClose={() => handleTagClose(key, values)}
            closable
            key={key}>
            {`${minPrice}-${maxPrice} NOK`}
          </StyledTag>
        )
      }
    }
    if (key === 'address.location') {
      const radius = values / 1000

      return (
        <StyledTag
          className="mb-8"
          onClose={() => handleTagClose(key, values)}
          closable
          key={key}>
          {`${radius}km`}
        </StyledTag>
      )
    }
    if (key === 'subcategoryId') {
      return values?.map((categoryId) => {
        const category = categories?.find(
          (category) => category?._id === categoryId
        )

        return (
          <StyledTag
            className="mb-8"
            onClose={() => handleTagClose(key, values)}
            closable
            key={key}>
            {category?.name}
          </StyledTag>
        )
      })
    }

    return values?.map((value) => {
      const displayValue =
        key === 'brandId'
          ? brands?.find((brand) => brand._id === value)?.name || value
          : value

      return (
        <StyledTag
          className="mb-8"
          closable
          onClose={() => handleTagClose(key, value)}
          key={`${key}-${displayValue}`}>
          {`${displayValue}`}
        </StyledTag>
      )
    })
  }

  const handleResetFiltersAll = () => {
    setFilterParams({})
  }
  const handleTagClose = (key, value) => {
    const updatedFilterParams = JSON.parse(JSON.stringify(filterParams))
    if (key === 'pricePerDay' || key === 'address.location') {
      delete updatedFilterParams[key]
      return setFilterParams(updatedFilterParams)
    }

    if (key !== 'pricePerDay' && updatedFilterParams[key]) {
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
            <Typography.Text className="strong">
              {t('Selected')}
            </Typography.Text>

            <Button
              type="text"
              style={{ color: colorPrimary }}
              onClick={handleResetFiltersAll}>
              {t('Clear all')}
            </Button>
          </div>

          <Typography.Text type="secondary">
            {!brandsLoading &&
              Object.entries(filterParams)?.map(([key, values]) =>
                createTags(key, values)
              )}
          </Typography.Text>
          <Divider className="mt-16 mb-24" />
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
