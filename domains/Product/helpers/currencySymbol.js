import { CURRENCIES, CURRENCY_SYMBOLS } from '__constants__'

const currencySymbol = (currency) =>
  currency ? CURRENCY_SYMBOLS[currency] : CURRENCY_SYMBOLS[CURRENCIES.NOK]

export default currencySymbol
