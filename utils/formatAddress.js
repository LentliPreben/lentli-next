const formatAddress = (address) => {
  if (!address) return ''
  else {
    const {
      country,
      city,
      region,
      streetName,
      streetNumber,
      district,
      postalTown
    } = address

    return [
      country,
      city,
      region,
      streetName,
      streetNumber,
      district,
      postalTown
    ]
      ?.filter(Boolean)
      ?.join(', ')
  }
}

export default formatAddress
