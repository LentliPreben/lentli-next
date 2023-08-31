import Tooltip from 'rc-tooltip'

const Popover = (props) => {
  const { children, title, content, overlay, ...rest } = props

  return (
    <Tooltip
      overlay={
        <div className="tooltip-wrapper">
          {title && <div className="tooltip-title">{title}</div>}
          {overlay}
        </div>
      }
      trigger={['click']}
      placement="bottom"
      {...rest}>
      {children}
    </Tooltip>
  )
}

export default Popover
