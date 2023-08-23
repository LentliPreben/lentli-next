import { Space, Button, Skeleton } from 'antd'
import styled from 'styled-components'

const StyledSpace = styled(Space)`
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: ${({ tagsView }) => !tagsView && '0'};
  color: ${({ theme, tagsView }) => !tagsView && theme.colorTextSecondary};
`

const StyledSkeleton = styled(Skeleton.Button)`
  height: 32px !important;
  display: flex !important;
  align-items: center;

  span {
    height: 22px !important;
  }
`

export { StyledSpace, StyledButton, StyledSkeleton }
