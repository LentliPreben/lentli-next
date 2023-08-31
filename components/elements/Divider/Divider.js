import { getClassNames } from 'utils'

const Divider = (props) => {
  const { type = 'horizontal', className } = props

  const computedClassName = getClassNames({
    divider: true,
    ['divider-vertical']: type === 'vertical',
    [className]: className
  })

  return <div className={computedClassName}></div>
}

export default Divider
