import { Col, Row, Typography, theme } from 'antd'

import { DateRangeInputs } from 'components'
import { DateRangeStyled } from './DateRange.styled'
import { LOCALES } from '__constants__'
import moment from 'moment'
import { useTranslations } from 'contexts'

const { Text, Title } = Typography

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
        <Row align="center" className="mb-24">
          <Col span={10}>
            <Title level={4}>{computedDayLabel}</Title>
            <Text type="secondary">{formattedDateRange}</Text>
          </Col>
          <Col span={14} className="flex flex-col" justify="center">
            <DateRangeInputs range={range} onChange={onChange} />
          </Col>
        </Row>
      )}
      <Row className="mt-24">
        <Col span={24} onClick={handleStopPropagation}>
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
        </Col>
      </Row>
    </>
  )
}

export default DateRange
