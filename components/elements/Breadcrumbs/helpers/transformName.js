import { capitalize } from 'utils'

const transformName = (name) => {
  const splittedName = name?.split('_') || ''
  if (splittedName.length > 2) {
    const variant = splittedName.pop()
    const title = splittedName
      .reduce((acc, curr) => {
        if (curr.length === 1) return `${acc}${curr}`
        return `${acc} ${curr}`
      }, '')
      ?.trim?.()
    return variant === 'ALL'
      ? capitalize(title || '')
      : capitalize(variant || '')
  } else if (splittedName.length === 2) {
    const [domain, variant] = splittedName
    return !!variant && variant === 'ALL'
      ? capitalize(domain || '')
      : capitalize(domain || '') + ' ' + variant.toLowerCase() || ''
  } else {
    const [domain, variant] = splittedName || []

    return !!variant && variant === 'ALL'
      ? capitalize(domain || '')
      : capitalize(name || '')
  }
}

export default transformName
