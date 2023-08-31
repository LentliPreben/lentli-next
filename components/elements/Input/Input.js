import { getClassNames } from 'utils'

const Input = (props) => {
  const { rounded, size, icon, block, inverse, className, onChange, ...rest } =
    props

  const classNames = getClassNames({
    input: true,
    'input-rounded': rounded,
    [`input-${size}`]: size,
    'input-icon': icon,
    block,
    inverse,
    [className]: !!className
  })

  const handleChange = (event) => onChange?.(event?.target?.value)

  return <input className={classNames} onChange={handleChange} {...rest} />
}

export default Input
