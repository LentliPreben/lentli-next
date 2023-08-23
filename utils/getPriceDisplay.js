import _ from 'lodash'
import { CURRENCY_SYMBOLS } from '__constants__'

const getPriceDisplay = ({ price, currency, period = 1 }) => {
  // Period is equal number of days
  const pricePerPeriod = price * period

  const numberAsString = pricePerPeriod.toString()

  const digits = numberAsString.split('')
  const result = _.join(
    [digits.slice(0, -3).join(''), ' ', ...digits.slice(-3)],
    ''
  )

  return `${result}${CURRENCY_SYMBOLS?.[currency] || CURRENCY_SYMBOLS.USD}`
}

export default getPriceDisplay
