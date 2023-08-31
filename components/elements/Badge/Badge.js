import { badgeWrapperStyles, badgeStyles } from './Badge.styled'

const Badge = (props) => {
  const { count, children } = props

  return (
    <div style={badgeWrapperStyles}>
      {!!count && <div style={badgeStyles}>{count}</div>}
      {children}
    </div>
  )
}

export default Badge
