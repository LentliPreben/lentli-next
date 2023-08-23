import TagStyled from './TagListItem.styled'
import { capitalize } from 'utils'

const TagListItem = (props) => {
  const { name } = props

  const capitalizedName = capitalize(name)

  return <TagStyled>{capitalizedName}</TagStyled>
}

export default TagListItem
