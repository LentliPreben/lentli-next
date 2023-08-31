import pluralize from 'pluralize'
import { Text, Button } from 'components'
import { useTranslations } from 'contexts'
import { useRouter } from 'next/router'

const SearchResultsHeading = (props) => {
  const { countResults, searchValue } = props

  const router = useRouter()
  const { t } = useTranslations()

  const computeNoun = pluralize('result', countResults)
  const description = `${countResults} ${computeNoun} ${t(
    'found for'
  )} "${searchValue}"`

  const handleClearSearch = () =>
    router.push({
      pathname: '/landing'
    })

  return (
    <div className="search-result-heading">
      <Text variant="label">{description}</Text>
      <Button
        primary
        size="sm"
        icon="/assets/close.svg"
        onClick={handleClearSearch}>
        {t('Clear search')}
      </Button>
    </div>
  )
}

export default SearchResultsHeading
