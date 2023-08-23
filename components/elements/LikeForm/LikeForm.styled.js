import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme, Button } from 'antd'

const LikeButtonStyled = styled(Button)`
  svg,
  svg path {
    fill: ${({ isLiked, theme }) =>
      isLiked ? theme.colorPrimary : 'transparent'};
    stroke: ${({ isLiked, theme }) => isLiked && theme.colorPrimary};
  }
`

export default LikeButtonStyled
