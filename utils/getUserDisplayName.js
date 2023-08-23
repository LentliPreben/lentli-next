const getUserDisplayName = (user) => {
  const firstName = user?.firstName || ' '
  const lastName = user?.lastName || ' '

  return `${firstName} ${lastName}`?.trim()
}

export default getUserDisplayName
