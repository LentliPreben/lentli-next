const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  NOK: 'NOK'
}

const CURRENCIES_LABELS = {
  USD: 'Usd',
  EUR: 'Eur',
  NOK: 'Nok'
}
const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  NOK: ',-'
}

const CURRENCIES_OPTIONS = Object.keys(CURRENCIES_LABELS).map((key) => ({
  label: CURRENCIES[key],
  value: key
}))

export default CURRENCIES
export { CURRENCIES_OPTIONS, CURRENCIES, CURRENCIES_LABELS, CURRENCY_SYMBOLS }
