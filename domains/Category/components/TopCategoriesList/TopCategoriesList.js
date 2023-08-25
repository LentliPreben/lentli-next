import { useHorizontalScroll } from 'hooks'
import {
  StyledSpace,
  StyledButton,
  StyledSkeleton
} from './TopCategoriesList.styles'
import { theme } from 'antd'
import { useGetTopCategories } from 'domains/Category/hooks'
import { Link } from 'components'
import Image from 'next/image'
import { CATEGORY_ICONS } from '__constants__'

const LOADING_ITEMS = [...Array(8).keys()]

const TopCategoriesList = (props) => {
  const { tagsView = true } = props

  const token = theme.useToken().token
  const [scrollRef, handleMouseEnter, handleMouseLeave] = useHorizontalScroll()
  const [topLevelCategories, loadingTopLevelCategories] = useGetTopCategories()

  const spaceSize = tagsView ? 'small' : 'large'
  const type = tagsView ? 'default' : 'link'

  return (
    <StyledSpace
      size={spaceSize}
      ref={scrollRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {loadingTopLevelCategories
        ? LOADING_ITEMS?.map((value) => <StyledSkeleton active key={value} />)
        : topLevelCategories?.map((category) => {
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
