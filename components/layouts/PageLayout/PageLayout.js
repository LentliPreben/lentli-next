import { PageHeader, AppLayout } from 'components'

const PageLayout = (props) => {
  const {
    children,
    actions,
    headingProps,
    breadcrumbs,
    onBack,
    topHeader,
    filter,
    ...rest
  } = props

  return (
    <AppLayout {...rest}>
      <div className="flex flex-col flex-1">
        <PageHeader
          topHeader={topHeader}
          onBack={onBack}
          actions={actions}
          {...headingProps}
          breadcrumbs={breadcrumbs}
          filter={filter}
        />
        {children}
      </div>
    </AppLayout>
  )
}

export default PageLayout
