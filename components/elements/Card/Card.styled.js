import styled from 'styled-components'

const CardStyled = styled.div`
  padding: ${({ padding }) => padding || '16px'};
  border: 1px solid var(--secondary-lighten-7);
  border-radius: var(--border-radius-default);
  background: var(--white);
`

export default CardStyled
