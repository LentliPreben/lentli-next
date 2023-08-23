import { TagListItem } from 'domains/Tag/components'
import TagListStyled from './TagList.styles'
import { Typography } from 'antd'
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
        <Typography.Text>n/a</Typography.Text>
      ),
    [tags]
  )
  return <TagListStyled>{tagsList}</TagListStyled>
}

export default TagList
