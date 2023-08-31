import styled from 'styled-components'

const ProductRangeSelectWrapper = styled.div`
  background-color: var(--white);
  overflow: hidden;
  padding: 24px;
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.03),
    0px 1px 6px -1px rgba(0, 0, 0, 0.02),
    0px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: var(--border-radius-default);
  top: 0;

  .ant-popover-inner {
    border-radius: var(--border-radius-default);
  }
`

export default ProductRangeSelectWrapper
