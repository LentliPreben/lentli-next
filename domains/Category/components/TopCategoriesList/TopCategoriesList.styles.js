import Button from 'components/elements/Button'
import styled from 'styled-components'

const StyledSpace = styled.div`
  display: flex;
  gap: 20px;
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
  color: ${({ tagsView }) => !tagsView && 'var(--text-color-secondary)'};
`

export { StyledSpace, StyledButton }
