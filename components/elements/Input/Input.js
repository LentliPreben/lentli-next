import { getClassNames } from 'utils'

const Input = (props) => {
  const {
    rounded,
    large,
    small,
    icon,
    block,
    inverse,
    className,
    onChange,
    ...rest
  } = props

  const classNames = getClassNames({
    input: true,
    'input-rounded': rounded,
    'input-lg': large,
    'input-sm': small,
    'input-icon': icon,
    block,
    inverse,
    [className]: !!className
  })

  const handleChange = (event) => onChange?.(event?.target?.value)

  return <input className={classNames} onChange={handleChange} {...rest} />
}

export default Input
