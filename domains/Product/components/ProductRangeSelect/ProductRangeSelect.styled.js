import styled from 'styled-components'

const ProductRangeSelectWrapper = styled.div`
  background-color: ${({ theme }) => theme.colorBgBase};
  overflow: hidden;
  padding: ${({ theme }) => `${theme.paddingLG}px`};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03),
    0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: ${({ theme }) => `${theme.borderRadiusLG}px`};
  top: 0;

  .ant-popover-inner {
    border-radius: ${({ theme }) => `${theme.borderRadiusLG}px`};
  }
`

export default ProductRangeSelectWrapper
