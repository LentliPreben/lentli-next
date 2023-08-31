import moment from 'moment'
import { useTranslations } from 'contexts'
import { finalCheck } from './helpers'
import { Text, Input } from 'components'

const DateRangeInputs = (props) => {
  const { range, onChange } = props

  const { t } = useTranslations()

  const handleChangeStartDate = (event) => {
    const date = event.target.value
    const isValid = moment(date).isValid()
    isValid &&
      onChange?.({
        startDate: moment(date).toDate()
      })
  }

  const handleChangeEndDate = (event) => {
    const date = event.target.value
    const isValid = moment(date).isValid()
    isValid && onChange?.({ endDate: moment(date).toDate() })
  }

  const handleClick = (event) => event.preventDefault()

  const handleFinalCheck = () => finalCheck(range, t, onChange)

  return (
    <div className="flex align-center gap-8 full-width">
      <Input
        size="sm"
        value={moment(range?.startDate).format('YYYY-MM-DD')}
        allowClear
        type="date"
        className="flex-1"
        onChange={handleChangeStartDate}
        onClick={handleClick}
        onBlur={handleFinalCheck}
        onPressEnter={handleFinalCheck}
      />
      <Text secondary>-</Text>
      <Input
        size="sm"
        value={moment(range?.endDate).format('YYYY-MM-DD')}
        allowClear
        type="date"
        className="flex-1"
        onChange={handleChangeEndDate}
        onClick={handleClick}
        onBlur={handleFinalCheck}
        onPressEnter={handleFinalCheck}
      />
    </div>
  )
}

export default DateRangeInputs
