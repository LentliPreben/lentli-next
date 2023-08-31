import CardStyled from './Card.styled'

const Card = (props) => {
  const { children, ...rest } = props

  return <CardStyled {...rest}>{children}</CardStyled>
}

export default Card
