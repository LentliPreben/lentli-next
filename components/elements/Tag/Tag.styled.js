import styled from 'styled-components'

const TagStyled = styled.div`
  padding: 4px 8px;
  border: 1px solid var(--tag-border-color);
  background-color: var(--tag-bg);
  border-radius: var(--border-radius-default);
  font-size: var(--tag-font-size);
  line-height: var(--tag-line-height);
  color: var(--tag-color);
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

export default TagStyled
