import { Button } from 'components'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  position: absolute;
  top: ${({ xs }) => (xs ? '72px' : '32px')};
  left: ${({ xs }) => (xs ? '20px' : '48px')};
  align-items: center;
  display: flex;
  justify-content: center;
`

export default StyledButton
