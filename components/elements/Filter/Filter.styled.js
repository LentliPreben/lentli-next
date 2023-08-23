import { Collapse } from 'antd'
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

export const StyledCollapse = styled(Collapse)`
  margin-bottom: 36px;

  .ant-collapse-header {
    padding-inline: 0px !important;
    padding-top: 0 !important;
    padding-bottom: 16px !important;
    font-weight: 600;
  }
  .ant-collapse-content-box {
    padding-block: 0px !important;
    padding: 0px !important;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ant-collapse-expand-icon {
    order: 2;
    padding-inline-end: 0px !important;
  }
`

export const BlurBox = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`
