import moment from 'moment'
import { notification } from 'utils'
/**
 *
 * @param {object} range  has startDate and endDate
 * @param {*} t           translation function
 * @param {*} onChange    handling changing
 */
const finalCheck = (range, t, onChange) => {
  const { endDate, startDate } = range

  // Check if start date is today or day after today
  if (!moment(startDate).isAfter(moment().subtract(1, 'd'))) {
    notification({
      type: 'error',
      message: `${t(
        'The selected date cannot be from the past'
      )}. ${'Please, select other date'}`
    })
    onChange?.({ startDate: moment().toDate() })
    return
  }

  // Check if end date is today or day after today
  if (!moment(endDate).isAfter(moment().subtract(1, 'd'))) {
    notification({
      type: 'error',
      message: `${t(
        'The selected date cannot be from the past'
      )}. ${'Please, select other date'}`
    })
    onChange?.({ endDate: moment().toDate() })
    return
  }

  // Check if end date is after start date
  if (
    !moment(endDate).isAfter(moment(startDate)) &&
    !moment(endDate).startOf('day').isSame(moment(startDate).startOf('day'))
  ) {
    notification({
      type: 'error',
      message: `${t(
        'The end date cannot be earlier than the initial date'
      )}. ${'Please, select other date'}`
    })
    onChange?.({ startDate: moment().toDate() })
    return
  }
}

export default finalCheck
