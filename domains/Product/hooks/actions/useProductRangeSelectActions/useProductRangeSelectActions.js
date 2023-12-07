import { useState, useEffect } from 'react'
import moment from 'moment'
import { getPriceDisplay } from 'utils'
import pluralize from 'pluralize'
import { MOMENT_FORMATS } from '__constants__'
import { useBreakpoint } from 'hooks'
import _ from 'lodash'
import { useGetProductDisabledDates } from 'domains/Product/hooks'
import { calculateFinalPayment } from 'helpers'

const { MONTH_DAYS_YEAR, DAY_MONTH } = MOMENT_FORMATS

const useProductRangeSelectActions = (product) => {
  const { xs } = useBreakpoint()
  const [disabledDates] = useGetProductDisabledDates(product?._id)

  const [range, setRange] = useState({})
  const [periodInDays, setPeriodInDays] = useState(1)

  const pricePerDayWithFeesDisplay = getPriceDisplay({
    price: calculateFinalPayment(product?.pricePerDay) || 0,
    currency: product?.currency
  })
  const pricePerPeriodWithFeesDisplay = getPriceDisplay({
    price: calculateFinalPayment(product?.pricePerDay * periodInDays || 0),
    currency: product?.currency
  })
  const computedDayLabel = pluralize('day', periodInDays, true)

  const formattedDateRange = xs
    ? `${moment(range?.startDate).format(DAY_MONTH)} - ${moment(
        range?.endDate
      ).format(DAY_MONTH)}`
    : `${moment(range?.startDate).format(MONTH_DAYS_YEAR)} - ${moment(
        range?.endDate
      ).format(MONTH_DAYS_YEAR)}`

  const handleChangeRange = (value) => {
    setRange((prevValue) => {
      const startDate = value?.startDate || prevValue?.startDate
      const endDate = value?.endDate || prevValue?.endDate

      return {
        startDate: startDate || prevValue?.startDate,
        endDate: endDate || prevValue?.endDate
      }
    })
  }

  useEffect(() => {
    const { startDate, endDate } = range

    const computedPeriodInDays =
      moment(endDate).diff(moment(startDate), 'd') + 1

    setPeriodInDays(computedPeriodInDays)
  }, [range])

  useEffect(() => {
    const isDateDisabled = (date) =>
      _.some(disabledDates, (disabledDate) =>
        moment(disabledDate).isSame(date, 'day')
      )

    // Create a clone of currentDate to avoid modifying the original
    let availableDate = moment().startOf('day')
    while (isDateDisabled(availableDate)) {
      // If the current date is disabled, add one day to the availableDate
      availableDate = availableDate.add(1, 'days')
    }

    setRange({
      startDate: moment(availableDate).startOf('day').toDate(),
      endDate: moment(availableDate).startOf('day').toDate()
    })
  }, [disabledDates])

  return {
    range,
    periodInDays,
    pricePerDayWithFeesDisplay,
    pricePerPeriodWithFeesDisplay,
    computedDayLabel,
    disabledDates,
    formattedDateRange,
    handleChangeRange
  }
}

export default useProductRangeSelectActions
