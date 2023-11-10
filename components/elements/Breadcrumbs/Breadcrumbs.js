import { Link, Text } from 'components'

import Image from 'next/image'
import PropTypes from 'prop-types'
import StyledBreadcrumbs from './Breadcrumbs.styled'
import chevronRight from 'public/assets/chevronRight.svg'
import home03Outlined from 'public/assets/home03Outlined.svg'
import { useExtraBreadcrumbsItems } from './hooks'
import { useTranslations } from 'contexts'

/**
 * It returns a breadcrumb component with a link to the home page and a link to the current page
 * @returns A breadcrumb component with a link to the home page and any extra breadcrumbs that are
 * passed in.
 */
const Breadcrumbs = (props) => {
  const { collection } = props

  const { t, language } = useTranslations()

  const [extraBreadcrumbItems] = useExtraBreadcrumbsItems(collection)
  // we need to disable click on the item name as it has no sense in it
  // so we check of extraBreadcrumbItems has Edit in path and then disable both items
  const hasEdit = extraBreadcrumbItems?.some(({ name }) => name === 'Edit')

  const Separator = () => (
    <Image src={chevronRight} width={12} height={12} alt={t('Separator')} />
  )
  return (
    <StyledBreadcrumbs>
      <Link href="/">
        <Image width={16} height={16} src={home03Outlined} alt={t('Home')} />
      </Link>
      {!!extraBreadcrumbItems?.length && <Separator />}
      {/* if path has Edit word then we can disable click on item name - replace it with Text */}
      {extraBreadcrumbItems?.map(({ key, path, name }, index) => {
        if (hasEdit && index >= extraBreadcrumbItems.length - 2) {
          return (
            <div key={key}>
              <Text>{t(name)}</Text>
              <Separator />
            </div>
          )
        }

        return index === extraBreadcrumbItems.length - 1 ? (
          <Text>{name?.[language.toUpperCase()] || name}</Text>
        ) : (
          <>
            <Link href={path}>{name?.[language.toUpperCase()] || name}</Link>
            <Separator />
          </>
        )
      })}
    </StyledBreadcrumbs>
  )
}

Breadcrumbs.propTypes = {
  collection: PropTypes.string
}
export default Breadcrumbs
