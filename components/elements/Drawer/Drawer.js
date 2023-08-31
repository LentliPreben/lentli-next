import React from 'react'
import ReactDrawer from 'rc-drawer'
import { Title } from 'components'

const Drawer = (props) => {
  const { title, children, ...rest } = props

  return (
    <ReactDrawer {...rest}>
      {title && (
        <div className="rc-drawer-title-wrapper">
          <Title as="h4">{title}</Title>
        </div>
      )}
      <div className="rc-drawer-children-wrapper">{children}</div>
    </ReactDrawer>
  )
}
export default Drawer
