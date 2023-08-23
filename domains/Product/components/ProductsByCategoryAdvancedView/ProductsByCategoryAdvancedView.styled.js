import { Space } from 'antd'
import styled from 'styled-components'

export const StyledSpace = styled(Space)`
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
