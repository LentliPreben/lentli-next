import styled from 'styled-components'

const PageHeaderSimpleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colorBgContainer};
  height: fit-content;
`

export default PageHeaderSimpleWrapper
