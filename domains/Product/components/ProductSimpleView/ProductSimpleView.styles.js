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
  bottom: 6px;
  left: 0;
  right: 0;
  background: transparent;
  background-image: linear-gradient(transparent 60%, #00000085);
  border-radius: 8px;
`

const imageRow = {
  height: '128px'
}

const CardStyled = styled(Card)`
  cursor: pointer;
  height: 100%;

  a {
    width: 100%;
  }

  .ant-card-body {
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

export { ImageOverlay, CardStyled, likeFormStyles, imageRow }
