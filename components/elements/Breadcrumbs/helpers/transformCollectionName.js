import { capitalize } from 'utils'

const transformCollectionName = (name) =>
  name
    .split('-')
    .map((word, index) => (index !== 0 ? capitalize(word) : word))
    .join('')

export default transformCollectionName
