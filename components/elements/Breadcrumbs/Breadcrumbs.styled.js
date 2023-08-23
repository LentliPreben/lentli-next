import { Breadcrumb } from 'antd'
import styled from 'styled-components'

const StyledBreadCrumb = styled(Breadcrumb)`
  .ant-breadcrumb-separator,
  .ant-breadcrumb-link > * {
    display: flex;
    align-items: center;
  }
  li {
    display: flex;
    align-items: center;
  }
`

export default StyledBreadCrumb
