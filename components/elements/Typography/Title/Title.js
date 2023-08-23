import { createElement } from 'react'
import { getClassNames } from 'utils'

const DEFAULT_TAG = 'h1'

/**
 * It returns a React element
 * @param props - This is the props object that is passed to the component,
 * has `as` - tag's name.
 * @returns A React component that renders an HTML element with the tag name specified by the `as`
 * prop, or `h1` if no `as` prop is provided. The component's class name is set to the tag name.
 */
const Title = (props) => {
  const { as, children, center, inverse, className, ...rest } = props

  const tag = as || DEFAULT_TAG

  const computedClassName = getClassNames({
    [tag]: true,
    'text-center': center,
    'c-inverse': inverse,
    [className]: className
  })

  const tagComputed = tag === 'mega' ? 'h1' : tag

  return createElement(tagComputed, {
    className: computedClassName,
    dangerouslySetInnerHTML: { __html: children },
    ...rest
  })
}

export default Title
