import { createElement } from 'react'
import { getClassNames } from 'utils'

const DEFAULT_TAG = 'p'
const DEFAULT_VARIANT = 'body'

/**
 * It returns a React element with the appropriate className
 * @returns A function that takes in props and returns a React element.
 */
const Text = (props) => {
  const {
    variant,
    className,
    secondary,
    primary,
    inverse,
    align,
    italic,
    disabled,
    uppercase,
    ellipsis,
    center,
    ...rest
  } = props

  const tag = DEFAULT_TAG
  const computedVariant = variant || DEFAULT_VARIANT

  const computedClassName = getClassNames({
    [variant]: computedVariant,
    [className]: className,
    [`text-${align}`]: align,
    'c-secondary': secondary,
    'c-primary': primary,
    'c-inverse': inverse,
    'fs-italic': italic,
    'text-center': center,
    disabled: disabled,
    uppercase: uppercase,
    ellipsis
  })

  return createElement(tag, {
    className: computedClassName,
    ...rest
  })
}

export default Text
