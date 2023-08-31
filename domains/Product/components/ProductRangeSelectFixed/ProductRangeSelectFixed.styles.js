import styled from 'styled-components'

const productRangeSelectWrapperHeight = '560px'
const productRangeSelectHeaderHeight = '47px'

const ProductRangeSelectFixedWrapper = styled.div`
  position: fixed;
  padding: 18px 24px;
  height: ${productRangeSelectWrapperHeight};
  background: var(--white);
  left: 0;
  right: 0;
  bottom: ${({ isOpened, xs, sm }) =>
    xs || sm
      ? isOpened
        ? 0
        : `calc((${productRangeSelectWrapperHeight} - ${productRangeSelectHeaderHeight}) * -1)`
      : 0};

  border-top: 1px solid var(--border-default-color);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 100;

  &:before {
    content: '';
    width: 64px;
    height: 4px;
    background: var(--secondary-lighten-6);
    position: absolute;
    left: calc(50% - 32px);
    top: 12px;
    border-radius: 3px;
  }
`
const Body = styled.div`
  width: 100%;
  max-width: 520px;
`
export { ProductRangeSelectFixedWrapper, Body }
