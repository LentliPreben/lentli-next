import { useTranslations } from 'contexts'
import { useEffect, useState, useCallback } from 'react'
import { SearchInput, Button } from 'components'
import { useRouter } from 'next/router'

const ProductsGlobalSearchInputWithAction = (props) => {
  const { withAction = true, ...rest } = props

  const { t } = useTranslations()
  const router = useRouter()

  const [searchValue, setSearchValue] = useState()

  const handleChange = (value) => {
    setSearchValue(value)
  }
  const handleSearch = useCallback(() => {
    router.push({
      pathname: 'products/search',
      query: { searchValue }
    })
  }, [router, searchValue])

  useEffect(() => {
    const inputSearchElement = document?.querySelector('#global-search-input')

    inputSearchElement?.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        handleSearch()
      }
    })
  }, [handleSearch])

  return (
    <div className="row flex-fill">
      <div className="col d-flex">
        <SearchInput
          id="global-search-input"
          block
          large
          inverse
          placeholder={t('What do you want to find?')}
          iconPosition="right"
          value={searchValue}
          onPressEnter={handleSearch}
          onChange={handleChange}
          bordered={false}
          {...rest}
        />
      </div>
      {withAction && (
        <div className="col-auto">
          <Button large type="primary" onClick={handleSearch}>
            {t('Search')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductsGlobalSearchInputWithAction
