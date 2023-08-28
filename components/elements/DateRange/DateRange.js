import { theme } from 'antd'

import { DateRangeInputs, Text, Title } from 'components'
import { DateRangeStyled } from './DateRange.styled'
import { LOCALES } from '__constants__'
import moment from 'moment'
import { useTranslations } from 'contexts'

const DateRange = (props) => {
  const {
    range,
    computedDayLabel,
    showHeader,
    onChange,
    formattedDateRange,
    disabledDates
  } = props

  const { colorErrorText } = theme.useToken().token

  const { language } = useTranslations()

  const locale = LOCALES?.[language]

  const disabledDay = (day) => {
    const formattedDay = moment(day)

    return (
      !moment().isBefore(formattedDay) &&
      !moment().isSame(moment(formattedDay), 'day')
    )
  }

  const handleChangeDateRange = (item) => {
    const { selection } = item
    const endDate = selection?.endDate
    const startDate = selection?.startDate ?? selection?.endDate

    onChange?.({ endDate, startDate })
  }

  const handleStopPropagation = (event) => event.stopPropagation()

  return (
    <>
      {showHeader && (
        <div className="row align-center mb-24">
          <div className="col-5">
            <Title as="h4">{computedDayLabel}</Title>
            <Text secondary>{formattedDateRange}</Text>
          </div>
          <div className="col-7 flex flex-col justify-center">
            <DateRangeInputs range={range} onChange={onChange} />
          </div>
        </div>
      )}
      <div className="row mt-24">
        <div className="col-12" onClick={handleStopPropagation}>
          <DateRangeStyled
            months={2}
            locale={locale}
            editableDateInputs={false}
            onChange={handleChangeDateRange}
            disableColor={colorErrorText}
            disabledDates={disabledDates}
            moveRangeOnFirstSelection={false}
            showMonthAndYearPickers={false}
            showPreview={false}
            showDateDisplay={false}
            ranges={[{ ...range, key: 'selection' }]}
            weekdayDisplayFormat="EEEEEE"
            disabledDay={disabledDay}
            direction="horizontal"
          />
        </div>
      </div>
    </>
  )
}

export default DateRange
