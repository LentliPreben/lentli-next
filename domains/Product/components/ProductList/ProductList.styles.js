import List from 'components/elements/List'
import styled from 'styled-components'

const StyledList = styled(List)`
  ::-webkit-scrollbar {
    width: hidden;
    width: 4px;
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
  background-color: red !important;
`
export { StyledList }
