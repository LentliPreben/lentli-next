import styled from 'styled-components'

const CustomOptionStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 4px 24px;
  cursor: pointer;

  &:hover {
    background: var(--primary-lighten-5);
  }
`

export default CustomOptionStyled
