import StyledBreadcrumbs from './CategoryBreadcrumbs.styled'

import { useExtraCategoryBreadcrumbsItems } from './hooks'
import { Link, Text } from 'components'
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

  const Separator = () => (
    <Image src={chevronRight} width={12} height={12} alt={t('Separator')} />
  )

  return (
    <StyledBreadcrumbs>
      <Link href="/" className="flex align-center">
        <Image width={16} height={16} src={home03Outlined} alt={t('Home')} />
      </Link>
      {!!extraBreadcrumbItems?.length && <Separator />}

      {extraBreadcrumbItems?.map(({ _id, name }, index) => {
        const path = `/categories/${_id}/products`

        return index === extraBreadcrumbItems.length - 1 ? (
          <Text>{name}</Text>
        ) : (
          <>
            <Link href={path}>{name}</Link>
            <Separator />
          </>
        )
      })}
    </StyledBreadcrumbs>
  )
}

export default CategoryBreadcrumbs
