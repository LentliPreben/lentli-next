export const ActionsColStyled = (props) => {
  const { children, ...rest } = props

  return (
    <div className="col flex align-center justify-end flex-1 ml-16" {...rest}>
      {children}
    </div>
  )
}

export const PageHeaderWrapper = (props) => {
  const { children } = props

  const wrapperStyles = {
    background: 'white',
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    borderBottom: `1px solid var(--secondary-lighten-8)`
  }
  return <div style={wrapperStyles}>{children}</div>
}
