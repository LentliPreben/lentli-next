import styled from 'styled-components'

const AvatarStyled = styled.div`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size / 2}px`};
  background-color: var(--secondary-lighten-6);
  position: relative;

  img {
    padding: ${({ isUserAvatar }) => !isUserAvatar && '8px'};
    border-radius: ${({ size }) => `${size / 2}px`};
    box-sizing: border-box;
  }
`

export default AvatarStyled
