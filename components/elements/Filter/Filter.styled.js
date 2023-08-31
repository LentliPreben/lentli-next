import styled from 'styled-components'

export const StyledFilter = styled.div`
  border-radius: ${({ allRounded }) => (allRounded ? '8px' : '0 0 8px 8px')};
  box-shadow: ${({ noShadow }) => !noShadow && '0 4px 8px rgba(0, 0, 0, 0.05)'};
  padding: ${({ allRounded }) =>
    allRounded ? '0 16px 16px 16px ' : '0px 32px 16px 32px'};
  overflow: auto;
  height: 100%;
  max-height: calc(100vh - 144px);
  background: inherit;
  position: relative;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const StyledHeader = styled.div`
  border-radius: 8px 8px 0 0;
  z-index: 1;
  padding: 16px 32px 0px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`

export const BlurBox = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`
