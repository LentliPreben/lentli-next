import Image from 'next/image'
import styled from 'styled-components'

const ImageStyled = styled(Image)`
  border-radius: ${({ borderRadius }) => borderRadius && `${borderRadius}px`};
`

export default ImageStyled
