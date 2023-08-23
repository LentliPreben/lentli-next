import _ from 'lodash'
/**
 * Function is used to return new updated array for object in product filter,
 * if item from prop isn't in array - add it to array,
 * else remove it from array
 * @param   {array} array          initial array
 * @param   {bool}  isField        checking if field for removing/adding is field or not
 * @param   {object | string} item item for removing or adding
 * @returns {array} updated array
 */
const getUpdatedFilterArray = (array, isField, item) => {
  // input data
  // array: [1, 2, 3, 4]
  // isField: false
  // item: 2
  let newArray = []

  // check if item is in array and return item's index
  // returned index for current input data - 1
  const index = _.findIndex(
    array,
    (value) => value === item?._id || value === item
  )

  // if element isn't in array - add it to array
  if (index === -1) {
    newArray = [...array, isField ? item : item?._id]?.filter(
      (value) => !!value
    )
  }

  // if element is in array - remove it from array
  // array.slice(0, index) returns [1]
  // array.slice(index + 1) returns [3, 4]
  // concat returns [1, 3, 4]
  else {
    newArray = array.slice(0, index).concat(array.slice(index + 1))
  }

  return newArray
}
export default getUpdatedFilterArray
