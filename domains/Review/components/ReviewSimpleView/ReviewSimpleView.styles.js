import { Typography } from 'antd'
import styled from 'styled-components'

const StyledDisplayName = styled(Typography.Title)`
  font-size: 12px !important;
  line-height: 20px !important;
`

const StyledDisplayDate = styled(Typography.Text)`
  font-style: italic;
  font-size: 12px;
  padding: 2px;
`

export { StyledDisplayName, StyledDisplayDate }
