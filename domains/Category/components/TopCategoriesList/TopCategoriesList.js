import { useHorizontalScroll } from 'hooks'
import { StyledSpace, StyledButton } from './TopCategoriesList.styles'
import { theme } from 'antd'
import { Link } from 'components'
import Image from 'next/image'
import { CATEGORY_ICONS } from '__constants__'

const TopCategoriesList = (props) => {
  const { data, tagsView = true } = props

  const token = theme.useToken().token
  const [scrollRef, handleMouseEnter, handleMouseLeave] = useHorizontalScroll()

  const spaceSize = tagsView ? 'small' : 'large'
  const type = tagsView ? 'default' : 'link'

  return (
    <StyledSpace
      size={spaceSize}
      ref={scrollRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {data?.map((category) => {
        const href = `/categories/${category?._id}/products`
        const src = CATEGORY_ICONS?.[category?.icon]

        return (
          <Link href={href} key={category._id}>
            <StyledButton
              type={type}
              tagsView={tagsView}
              icon={
                src && (
                  <Image
                    src={src}
                    alt={category?.name}
                    width={12}
                    height={12}
                  />
                )
              }
              theme={token}>
              {category?.name}
            </StyledButton>
          </Link>
        )
      })}
    </StyledSpace>
  )
}

export default TopCategoriesList
