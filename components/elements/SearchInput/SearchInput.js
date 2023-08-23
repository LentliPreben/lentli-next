import { Input } from 'components'
import { getClassNames } from 'utils'

const SearchInput = (props) => {
  const { iconPosition = 'left', ...rest } = props

  const classNames = getClassNames({
    [`icon-${iconPosition}`]: iconPosition
  })

  return <Input className={classNames} {...rest} />
}

export default SearchInput
