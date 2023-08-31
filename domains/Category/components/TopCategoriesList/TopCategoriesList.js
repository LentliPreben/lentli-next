import { useHorizontalScroll } from 'hooks'
import { StyledSpace, StyledButton } from './TopCategoriesList.styles'
import { Link } from 'components'
import Image from 'next/image'
import { CATEGORY_ICONS } from '__constants__'
import { useRouter } from 'next/router'

const TopCategoriesList = (props) => {
  const { data, tagsView = true } = props

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
            {category?.name}
          </StyledButton>
        )
      })}
    </StyledSpace>
  )
}

export default TopCategoriesList
