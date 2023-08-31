import { getClassNames } from 'utils'

const Button = (props) => {
  const {
    href,
    children,
    type = 'secondary',
    block,
    rounded,
    size = 'md',
    icon,
    iconPosition = 'left',
    onClick,
    className,
    ...rest
  } = props

  // it is necessary to add the ability to add an icon when there is a new version of the design.
  // it will take a long time now, so I'm skipping it now
  const classNames = getClassNames({
    btn: true,
    [`btn-${type}`]: type,
    'btn-rounded': rounded,
    'btn-block': block,
    [`btn-${size}`]: size,
    [className]: !!className,
    'btn-only-icon': !children && icon
  })

  const leftIcon = iconPosition === 'left' ? icon : null
  const rightIcon = iconPosition === 'right' ? icon : null

  return (
    <a className={classNames} onClick={onClick} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  )
}

export default Button
