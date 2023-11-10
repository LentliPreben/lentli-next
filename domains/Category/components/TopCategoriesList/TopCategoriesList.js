import { StyledButton, StyledSpace } from './TopCategoriesList.styles'

import { CATEGORY_ICONS } from '__constants__'
import Image from 'next/image'
import { Link } from 'components'
import { useHorizontalScroll } from 'hooks'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts'

const TopCategoriesList = (props) => {
  const { data, tagsView = true } = props
  const { language } = useTranslations()
  const [scrollRef, handleMouseEnter, handleMouseLeave] = useHorizontalScroll()
  const router = useRouter()

  const spaceSize = tagsView ? 'small' : 'large'
  const type = tagsView ? 'default' : 'link'

  const handleGoToCategory = (id) => {
    const href = `/categories/${id}/products`

    router.push({
      pathname: href
    })
  }
  return (
    <StyledSpace
      size={spaceSize}
      ref={scrollRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {data?.map((category) => {
        const src = CATEGORY_ICONS?.[category?.icon]
        return (
          <StyledButton
            key={category._id}
            onClick={() => handleGoToCategory(category._id)}
            type={type}
            tagsView={tagsView}
            icon={
              src && (
                <Image src={src} alt={category?.name} width={12} height={12} />
              )
            }>
            {category?.names?.[language?.toUpperCase()] || category?.name}
          </StyledButton>
        )
      })}
    </StyledSpace>
  )
}

export default TopCategoriesList
