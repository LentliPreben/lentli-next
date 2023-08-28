import styled from 'styled-components'

const StyledRow = styled.div`
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    visibility: hidden;
  }
  ::-webkit-scrollbar-thumb {
    visibility: hidden;
  }
  ::-webkit-scrollbar-button {
    visibility: hidden;
  }
`
export { StyledRow }
