import { Typography } from 'antd'
import styled from 'styled-components'

const TitleStyled = styled(Typography.Title)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2;
`

const DisplayDateStyled = styled(Typography.Text)`
  font-size: 12px;
`

export { TitleStyled, DisplayDateStyled }
