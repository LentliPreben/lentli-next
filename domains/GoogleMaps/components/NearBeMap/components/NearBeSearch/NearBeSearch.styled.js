import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;

  ${({ xs }) =>
    xs
      ? `
          left: 20px;
          right: 20px;
          top: 20px;
        `
      : `
          margin-left: auto;
          margin-right: auto;
          width: 40%;
        `}
`
