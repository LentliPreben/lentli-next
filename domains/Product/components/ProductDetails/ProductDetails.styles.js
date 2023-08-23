import styled from 'styled-components'

const ProductDetailIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ colorFillSecondary }) => colorFillSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-right: 16px;
`

export { ProductDetailIconWrapper }
