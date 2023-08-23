import md5 from 'md5'
import moment from 'moment'
import { MOMENT_FORMATS } from '__constants__'

const getCheckoutId = ({ productId, startDate, endDate, amount }) => {
  const formattedStartDate = moment(
    startDate,
    MOMENT_FORMATS.DAY_MONTH_YEAR
  ).toDate()
  const formattedEndDate = moment(
    endDate,
    MOMENT_FORMATS.DAY_MONTH_YEAR
  ).toDate()

  // Get the unique hash of the object
  // the order of the fields is important!!!
  return md5(
    JSON.stringify({
      productId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      amount
    })
  )
}

export default getCheckoutId
