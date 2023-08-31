import { capitalize } from 'utils'
import Tag from 'components/elements/Tag'

const TagListItem = (props) => {
  const { name } = props

  const capitalizedName = capitalize(name)

  return <Tag>{capitalizedName}</Tag>
}

export default TagListItem
