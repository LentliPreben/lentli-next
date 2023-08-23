import { Card } from 'antd'

import styled from 'styled-components'

const likeFormStyles = {
  position: 'absolute',
  top: 8,
  right: 8
}

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  background-image: linear-gradient(transparent 60%, #00000085);
`

const imageRow = {
  height: '128px'
}
const CardStyled = styled(Card)`
  cursor: pointer;

  a {
    width: 100%;
  }

  .ant-card-body {
    padding: 0;
    position: relative;
  }
`

export { ImageOverlay, CardStyled, likeFormStyles, imageRow }
