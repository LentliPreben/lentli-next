const getMinAndMaxPrice = (products) => {
  let minPrice = 0
  let maxPrice = 0

  if (products?.length) {
    products?.sort((a, b) => a?.pricePerDay - b?.pricePerDay)

    minPrice = products?.[0]?.pricePerDay
    maxPrice = products?.[products?.length - 1]?.pricePerDay
  }

  return { minPrice, maxPrice }
}

export default getMinAndMaxPrice
