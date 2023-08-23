const ADDRESS_FIELDS = [
  { type: 'postal_code', field: 'postalCode' },
  { type: 'zip_code', field: 'zipCode' },
  { type: 'country', field: 'country' },
  { type: 'locality', field: 'city' },
  { type: 'postal_town', field: 'postalTown' },
  { type: 'route', field: 'streetName' },
  { type: 'street_number', field: 'streetNumber' },
  { type: 'administrative_area_level_1', field: 'region' },
  { type: 'administrative_area_level_2', field: 'district' }
]

export { ADDRESS_FIELDS }
export default ADDRESS_FIELDS
