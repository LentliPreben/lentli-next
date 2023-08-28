import { TagListItem } from 'domains/Tag/components'
import TagListStyled from './TagList.styles'
import { Text } from 'components'
import { useMemo } from 'react'

const TagList = (props) => {
  const { tags } = props

  const tagsList = useMemo(
    () =>
      tags?.length ? (
        tags?.map(({ name, ...rest }) => (
          <TagListItem key={`item-${name}`} name={name} {...rest} />
        ))
      ) : (
        <Text>n/a</Text>
      ),
    [tags]
  )
  return <TagListStyled>{tagsList}</TagListStyled>
}

export default TagList
