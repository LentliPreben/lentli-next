import moment from 'moment'
import { useGetProductRentDates } from 'domains/Product/hooks'
import { useMemo } from 'react'

const useGetProductDisabledDates = (productId) => {
  const [rentDates, loading] = useGetProductRentDates({ productId })

  const computeDifference = (startDate, endDate) =>
    endDate.diff(startDate, 'days') >= 0

  const disabledDatesMap = useMemo(
    () =>
      Object.values(rentDates || [])
        ?.map(({ startDate, endDate }) => {
          let disabledDates = []

          const startDateSeconds = startDate?.seconds
          const endDateSeconds = endDate?.seconds

          const formattedStartDate = moment
            .unix(startDateSeconds)
            .startOf('day')
          const formattedEndDate = moment.unix(endDateSeconds).startOf('day')

          while (computeDifference(formattedStartDate, formattedEndDate)) {
            disabledDates.push(
              new Date(formattedStartDate.format('YYYY-MM-DD'))
            )
            formattedStartDate.add(1, 'day')
          }

          return disabledDates
        })
        .flat(1),
    [rentDates]
  )

  return useMemo(() => [disabledDatesMap, loading], [disabledDatesMap, loading])
}

export default useGetProductDisabledDates
