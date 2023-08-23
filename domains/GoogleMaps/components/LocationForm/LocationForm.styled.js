import styled from 'styled-components'

export const LocationInputWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 32px;

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
          left: 0;
          right: 0;
        `}
`
