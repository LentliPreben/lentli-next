import styled from 'styled-components'

const wrapperWidthByMedia = {
  xs: '100%',
  sm: '100%',
  md: '100%',
  lg: '960px',
  xl: '1140px',
  xxl: '1320px'
}
const ProductImagesWrapper = styled.div`
  width: ${({ currentScreen }) => wrapperWidthByMedia?.[currentScreen]};

  display: flex;
  flex-direction: column;
  gap: 16px;
`
const ImageWrapper = styled.div`
  width: 100%;

  & > div {
    position: unset !important;
  }
  img {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`
export { ProductImagesWrapper, ImageWrapper }
