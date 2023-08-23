import { CURRENCY_SYMBOLS } from '__constants__'
/**
 * Function is used to get formatted price 12120 => 12,120, 120 => 120
 * @param   {number} price
 * @param   {string} currency
 * @returns {string} price in format 12,120 or 120
 */
const formatPrice = (price, currency) => {
  // Format number to string
  const priceToString = price?.toString()

  // Get length
  const length = priceToString?.length

  // Get currency symbol
  const computedCurrency = currency
    ? CURRENCY_SYMBOLS?.[currency]
    : CURRENCY_SYMBOLS?.NOK

  // If length is bigger then 4 just return string
  const formattedPrice =
    length < 4
      ? priceToString
      : `${priceToString?.slice(0, length - 3)} ${priceToString?.slice(-3)}`

  return computedCurrency
    ? `${formattedPrice}${computedCurrency}`
    : formattedPrice
}

export default formatPrice
