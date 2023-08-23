/**
 * Function helps to get the minimum value that is true
 * @param   {object} ratingMap  looks like { 5: true, 2: false }
 * @returns {number} minimum value from map
 */
const getMinimumRatingValue = (ratingMap) => {
  if (!ratingMap) return 0

  const filteredArrayOfRates =
    ratingMap && Object.keys(ratingMap)?.filter((value) => ratingMap?.[value])

  if (!filteredArrayOfRates?.length) return 0

  const minRate = Math.min.apply(
    Math,
    filteredArrayOfRates?.map((value) => Number(value))
  )

  return minRate
}

export default getMinimumRatingValue
