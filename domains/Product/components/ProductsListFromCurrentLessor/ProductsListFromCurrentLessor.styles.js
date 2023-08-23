import styled from 'styled-components'
import { Button } from 'antd'

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  gap: 2px;

  path {
    stroke: ${({ theme }) => theme.colorLink};
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &:hover path {
    stroke: ${({ theme }) => theme.colorLinkHover};
  }
`

export default ButtonStyled
