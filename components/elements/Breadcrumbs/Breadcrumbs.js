import { Breadcrumb, Typography } from 'antd'
import StyledBreadCrumb from './Breadcrumbs.styled'

import PropTypes from 'prop-types'
import { useExtraBreadcrumbsItems } from './hooks'
import { Link } from 'components'
import home03Outlined from 'public/assets/home03Outlined.svg'
import chevronRight from 'public/assets/chevronRight.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'
/**
 * It returns a breadcrumb component with a link to the home page and a link to the current page
 * @returns A breadcrumb component with a link to the home page and any extra breadcrumbs that are
 * passed in.
 */
const Breadcrumbs = (props) => {
  const { collection } = props

  const { t } = useTranslations()

  const [extraBreadcrumbItems] = useExtraBreadcrumbsItems(collection)
  // we need to disable click on the item name as it has no sense in it
  // so we check of extraBreadcrumbItems has Edit in path and then disable both items
  const hasEdit = extraBreadcrumbItems?.some(({ name }) => name === 'Edit')

  return (
    <StyledBreadCrumb
      separator={
        <Image src={chevronRight} width={12} height={12} alt={t('Separator')} />
      }>
      <Breadcrumb.Item key={'/'}>
        <Link href="/">
          <Image width={16} height={16} src={home03Outlined} alt={t('Home')} />
        </Link>
      </Breadcrumb.Item>
      {/* if path has Edit word then we can disable click on item name - replace it with Text */}
      {extraBreadcrumbItems?.map(({ key, path, name }, index) => {
        if (hasEdit && index >= extraBreadcrumbItems.length - 2) {
          return (
            <Breadcrumb.Item key={key}>
              <Typography.Text>{name}</Typography.Text>
            </Breadcrumb.Item>
          )
        }

        return (
          <Breadcrumb.Item
            key={key}
            active={index === extraBreadcrumbItems.length - 1}>
            {index === extraBreadcrumbItems.length - 1 ? (
              <Typography.Text>{name}</Typography.Text>
            ) : (
              <Link href={path}>{name}</Link>
            )}
          </Breadcrumb.Item>
        )
      })}
    </StyledBreadCrumb>
  )
}

Breadcrumbs.propTypes = {
  collection: PropTypes.string
}
export default Breadcrumbs
