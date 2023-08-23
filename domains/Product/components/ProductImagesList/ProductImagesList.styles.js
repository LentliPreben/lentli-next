import styled from 'styled-components'
import { Image } from 'antd'

const ProductImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ImageStyled = styled(Image)`
  width: 800px;
  height: 600px;
`

export { ProductImagesWrapper, ImageStyled }
