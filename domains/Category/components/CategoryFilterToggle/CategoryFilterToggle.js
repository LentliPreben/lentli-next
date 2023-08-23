import { Button } from 'components'

const CategoryFilterToggle = (props) => {
  const { setIsVisible } = props

  const handleToggle = () => setIsVisible((prevValue) => !prevValue)

  return <Button onClick={handleToggle} icon="/assets/menu.svg"></Button>
}

export default CategoryFilterToggle
