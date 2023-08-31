import { ActionsColStyled, PageHeaderWrapper } from './PageHeader.styled'
import { useBreakpoint } from 'hooks'
import { Title, Divider } from 'components'

const PageHeader = (props) => {
  const {
    title,
    actions,
    titleSize = 2,
    subTitle,
    breadcrumbs,
    withoutHeader,
    divider,
    topHeader,
    filter
  } = props

  const { xs } = useBreakpoint()
  const computedTitleSize =
    xs && `h${titleSize < 5 ? titleSize + 1 : titleSize}`

  if (withoutHeader) return null

  return (
    <>
      {topHeader && <PageHeaderWrapper>{topHeader}</PageHeaderWrapper>}
      <div
        className="relative mb-12"
        style={{ marginTop: topHeader && '68px' }}>
        {(breadcrumbs || filter) && (
          <div className="row align-center">
            <div className="col-auto mr-auto">{breadcrumbs}</div>
            <div className="col-auto ml-auto">{filter}</div>
          </div>
        )}
        <div className="row flex-nowrap align-start">
          <div className="col flex-auto">
            {title && (
              <>
                <div className={`flex align-center ${subTitle && 'mb-8'}`}>
                  <Title as={computedTitleSize}>{title}</Title>
                </div>
                {subTitle && subTitle}
              </>
            )}
            {divider && <Divider className="mb-0 mt-8" />}
          </div>
          {actions && <ActionsColStyled>{actions}</ActionsColStyled>}
        </div>
      </div>
    </>
  )
}

export default PageHeader
