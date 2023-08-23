import Link from 'next/link'
import { getClassNames } from 'utils'

const CustomLink = (props) => {
  const { href, className, ellipsis, children, disabled, ...rest } = props

  // Gte class name by got props
  const computedClassName = getClassNames({
    link: true,
    disabled,
    [className]: !!className,
    ellipsis
  })

  return (
    <Link href={href} className={computedClassName} {...rest}>
      {children}
    </Link>
  )
}

export default CustomLink
