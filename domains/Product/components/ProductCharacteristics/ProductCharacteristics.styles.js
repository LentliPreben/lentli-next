import styled from 'styled-components'

const UnlimitedDots = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 15px;
    border-bottom: 1px dotted #00000040;
  }
`

export default UnlimitedDots
