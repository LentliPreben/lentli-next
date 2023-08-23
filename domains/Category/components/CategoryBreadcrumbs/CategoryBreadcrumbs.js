import { Breadcrumb, Typography, theme } from 'antd'
import { StyledBreadCrumb } from './CategoryBreadcrumbs.styled'

import { Icon } from '@qonsoll/icons'
import { useExtraCategoryBreadcrumbsItems } from './hooks'
import { Link } from 'components'

const CategoryBreadcrumbs = (props) => {
  const { categoryId, productId } = props

  const token = theme.useToken().token
  /* Getting extra breadcrumbs */
  const [extraBreadcrumbItems] = useExtraCategoryBreadcrumbsItems({
    categoryId,
    productId
  })

  return (
    <StyledBreadCrumb
      separator={<Icon name="ArrowShortRightFilled" fill="currentColor" />}>
      <Breadcrumb.Item key={'/'}>
        <Link href="/" className="flex align-center">
          <Icon name="Home3Outlined" fill="currentColor" />
        </Link>
      </Breadcrumb.Item>

      {extraBreadcrumbItems?.map(({ _id, name }, index) => {
        const path = `/categories/${_id}/products`

        return (
          <Breadcrumb.Item
            key={_id}
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

export default CategoryBreadcrumbs
