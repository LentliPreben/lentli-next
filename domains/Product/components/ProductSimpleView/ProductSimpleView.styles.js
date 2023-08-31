import Card from 'components/elements/Card'

import styled from 'styled-components'

const likeFormStyles = {
  position: 'absolute',
  top: 8,
  right: 8
}

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 4px;
  left: 0;
  right: 0;
  background: transparent;
  background-image: linear-gradient(transparent 60%, #00000085);
  border-radius: 8px;
`

const imageRow = {
  height: '100px'
}

const CardStyled = styled(Card)`
  cursor: pointer;
  height: 100%;
`

export { ImageOverlay, CardStyled, likeFormStyles, imageRow }
