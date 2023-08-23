import { HOW_IS_IT_WORKS } from '__constants__'
import { ProcessOverviewItem } from 'domains/Process/components'

const ProcessOverview = () => {
  return (
    <div className="row">
      {HOW_IS_IT_WORKS?.map((item) => (
        <div key={item?.title} className="col-3">
          <ProcessOverviewItem {...item} />
        </div>
      ))}
    </div>
  )
}

export default ProcessOverview
