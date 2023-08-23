/**
 * It takes an object, filters out the falsy values, and returns a string of the keys
 * @param {object} obj - object - the object that contains the class names and their boolean values
 * @returns A string of all the classes that are true.
 */

const getClassNames = (object) => {
  const entries = Object.entries(object)
  const acceptedClassesArr = entries.filter((entry) => entry[1] && entry[0])
  const classesArr = acceptedClassesArr.map((cls) => cls[0])
  return classesArr.join(' ')
}

export default getClassNames
