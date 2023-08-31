import styled from 'styled-components'

export const StyledSpace = styled.div`
  display: flex;
  flex-wrap: inherit;
  gap: 24px;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  height: fit-content;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
export const StyledItemWrapper = styled.div`
  min-width: 220px;
  height: inherit;
`
