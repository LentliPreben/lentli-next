import { getClassNames } from 'utils'
import Image from 'next/image'

const Button = (props) => {
  const {
    href,
    children,
    type = 'secondary',
    block,
    rounded,
    large,
    small,
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
    'btn-lg': large,
    'btn-sm': small,
    [className]: !!className,
    'btn-only-icon': !children && icon
  })

  const iconComponent = icon && (
    <Image width={20} height={20} alt="button" src={icon} />
  )

  const leftIcon = iconPosition === 'left' ? iconComponent : null
  const rightIcon = iconPosition === 'right' ? iconComponent : null

  return (
    <a className={classNames} onClick={onClick} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  )
}

export default Button
