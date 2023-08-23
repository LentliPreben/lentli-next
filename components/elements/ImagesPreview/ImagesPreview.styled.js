import styled from 'styled-components'

const ImagesPreviewWrapper = styled.div`
  border-radius: 7px;
  overflow: hidden;
  display: flex;
  flex-direction: ${({ sm }) => (sm ? 'row' : 'column')};
  gap: 8px;
  display: flex;
  width: 100%;
  height: ${({ md }) => (md ? '430px' : '100%')};

  img {
    cursor: pointer;
  }
`
const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: ${({ sm }) => (sm ? '8.5 / 5' : '4 / 3')};
  }
  .ant-btn {
    position: absolute;
    right: ${({ sm }) => (sm ? 'unset' : '8px')};
    bottom: ${({ sm }) => (sm ? '24px' : '8px')};
    left: ${({ sm }) => (sm ? '24px' : 'unset')};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ant-btn:hover path {
    stroke: ${({ colorPrimaryActive }) => colorPrimaryActive};
  }
`

const SmallImagesPreviewWrapper = styled.div`
  display: flex;
  flex-direction: ${({ sm }) => (sm ? 'column' : 'row')};
  height: 100%;
  width: ${({ sm }) => (sm ? '30%' : '100%')};
  gap: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CountImagesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgb(11 10 14 / 45%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .count-images {
    color: white;
    font-size: 24px;
    line-height: 32px;
  }
`

const SmallImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: ${({ sm, length = 3 }) => {
    const offset = length === 1 ? '0px' : '4px'
    return sm ? `calc( 100% / ${length} - ${offset})` : '100%'
  }};
`

export {
  ImagesPreviewWrapper,
  MainImageWrapper,
  SmallImagesPreviewWrapper,
  CountImagesWrapper,
  SmallImagePreview
}
