import { Text } from 'components'

const Checkbox = (props) => {
  const { children, disabled, value, checked, onChange } = props

  const handleChange = () => {
    !disabled && onChange?.(value)
  }

  const Children =
    typeof children === 'string' ? (
      <Text variant="body2">{children}</Text>
    ) : (
      children
    )

  return (
    <label className="checkbox-wrapper" disabled={disabled}>
      {Children}
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="checkmark" />
    </label>
  )
}

export default Checkbox
