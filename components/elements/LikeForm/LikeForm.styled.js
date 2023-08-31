import styled from 'styled-components'
import Button from 'components/elements/Button'

const LikeButtonStyled = styled(Button)`
  svg,
  svg path {
    fill: ${({ isLiked }) =>
      isLiked ? 'var(--primary-default)' : 'transparent'};
    stroke: ${({ isLiked }) => isLiked && 'var(--primary-default)'};
  }
`

export default LikeButtonStyled
