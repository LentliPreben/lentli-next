import { getClassNames } from 'utils'

const Content = (props) => {
  const computedClassName = getClassNames({
    content: true
  })

  return <div className={computedClassName}>{props?.children}</div>
}

export default Content
