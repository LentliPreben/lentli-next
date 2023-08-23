import {
  ActionsColStyled,
  PageHeaderWrapper,
  StyledIcon,
  StyledSubtitle
} from './PageHeader.styled'
import { Col, Divider, Row, Tooltip, Typography } from 'antd'
import { useScreen } from 'hooks'

const PageHeader = (props) => {
  const {
    title,
    actions,
    titleSize = 1,
    subTitle,
    subTitleSize = 5,
    breadcrumbs,
    withoutHeader,
    divider,
    tooltipTitle,
    topHeader,
    filter
  } = props

  const { xs } = useScreen()
  const computedTitleSize = xs && titleSize < 5 ? titleSize + 1 : titleSize

  if (withoutHeader) return null

  return (
    <>
      {topHeader && <PageHeaderWrapper>{topHeader}</PageHeaderWrapper>}
      <div
        className="relative mb-12"
        style={{ marginTop: topHeader && '68px' }}>
        {(breadcrumbs || filter) && (
          <Row className="align-center">
            <Col className="mr-auto">{breadcrumbs}</Col>
            <Col className="ml-auto">{filter}</Col>
          </Row>
        )}
        <Row align="center" className="flex-nowrap align-start">
          <Col flex="auto">
            {title && (
              <>
                <div className={`flex align-center ${subTitle && 'mb-8'}`}>
                  <Typography.Title level={computedTitleSize}>
                    {title}
                  </Typography.Title>
                  {tooltipTitle && (
                    <Tooltip title={tooltipTitle} className="ml-8">
                      <StyledIcon
                        titleSize={titleSize}
                        name="InfoCircleOutlined"
                      />
                    </Tooltip>
                  )}
                </div>
                {subTitle && (
                  <StyledSubtitle level={subTitleSize}>
                    {subTitle}
                  </StyledSubtitle>
                )}
              </>
            )}
            {divider && <Divider className="mb-0 mt-8" />}
          </Col>
          {actions && <ActionsColStyled>{actions}</ActionsColStyled>}
        </Row>
      </div>
    </>
  )
}

export default PageHeader
