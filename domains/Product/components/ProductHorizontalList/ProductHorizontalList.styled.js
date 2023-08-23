import { Space } from 'antd'
import styled from 'styled-components'

export const StyledSpace = styled(Space)`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
export const StyledItemWrapper = styled.div`
  width: 220px;
  height: 275px;
`
