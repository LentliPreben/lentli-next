const CANCELLATION_TERMS_TYPES = {
  FIXED: 'FIXED',
  MODERATE: 'MODERATE',
  STRICT: 'STRICT'
}

const CANCELLATION_TERMS_TYPES_DESCRIPTION = {
  [CANCELLATION_TERMS_TYPES.FIXED]:
    'You can cancel the renting request within the first 48 hours from the initial request',
  [CANCELLATION_TERMS_TYPES.MODERATE]: 'You can request a return at any time',
  [CANCELLATION_TERMS_TYPES.STRICT]:
    'You can cancel the renting request within the first 12 hours from the initial request'
}

export default CANCELLATION_TERMS_TYPES_DESCRIPTION
export { CANCELLATION_TERMS_TYPES, CANCELLATION_TERMS_TYPES_DESCRIPTION }
