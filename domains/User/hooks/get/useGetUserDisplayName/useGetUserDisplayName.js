import { useMemo } from 'react'

const useGetUserDisplayName = (userObject) => {
  const displayName = useMemo(() => {
    if (!userObject && userLoadingComputed) return null

    const fullUserNameExists = userObject?.firstName && userObject?.lastName
    const partialUserNameExists = userObject?.firstName || userObject?.lastName

    return fullUserNameExists
      ? `${userObject?.firstName}  ${userObject?.lastName}`
      : partialUserNameExists
      ? `${userObject?.firstName || userObject?.lastName}`
      : null
  }, [userObject])

  return displayName
}

export default useGetUserDisplayName
