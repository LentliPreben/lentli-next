import { Space } from 'antd'
import styled from 'styled-components'

export const StyledSpace = styled(Space)`
  .ant-space-item > div {
    display: flex;
  }
  width: 100%;
  max-width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
export const NearProductsWrapper = styled.div`
  margin-top: auto;
  z-index: 1;
`

export const HeadingWrapper = styled.div`
  align-items: flex-end;
  display: inline-flex;
  pointer-events: auto;
  user-select: none;
  width: 100%;
`

export const TitleWrapper = styled.div`
  margin-bottom: 3px;
  margin-left: 16px;
`
