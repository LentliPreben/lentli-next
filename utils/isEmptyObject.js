const isEmptyObject = (obj) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (Array.isArray(obj[key]) && obj[key].length !== 0) {
        return false
      } else if (typeof obj[key] === 'string' && obj[key].trim() !== '') {
        return false
      } else if (
        obj[key] !== null &&
        typeof obj[key] === 'object' &&
        !isEmptyObject(obj[key])
      ) {
        return false
      }
    }
  }
  return true
}
export default isEmptyObject
