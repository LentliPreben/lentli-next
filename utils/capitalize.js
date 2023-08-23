/**
 * Capitalize the first letter of a string and lowercase the rest.
 * @param string - The string to capitalize.
 */
const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

export default capitalize
