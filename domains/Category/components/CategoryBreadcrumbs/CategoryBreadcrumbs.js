import { Breadcrumb, Typography } from 'antd'
import { StyledBreadCrumb } from './CategoryBreadcrumbs.styled'

import { useExtraCategoryBreadcrumbsItems } from './hooks'
import { Link } from 'components'
import home03Outlined from 'public/assets/home03Outlined.svg'
import chevronRight from 'public/assets/chevronRight.svg'
import Image from 'next/image'
import { useTranslations } from 'contexts'

const CategoryBreadcrumbs = (props) => {
  const { categoryId, productId } = props

  const { t } = useTranslations()

  /* Getting extra breadcrumbs */
  const [extraBreadcrumbItems] = useExtraCategoryBreadcrumbsItems({
    categoryId,
    productId
  })

  return (
    <StyledBreadCrumb
      separator={
        <Image src={chevronRight} width={12} height={12} alt={t('Separator')} />
      }>
      <Breadcrumb.Item key={'/'}>
        <Link href="/" className="flex align-center">
          <Image width={16} height={16} src={home03Outlined} alt={t('Home')} />
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
