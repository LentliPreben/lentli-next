import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'

import { firestore } from 'services/firebase'

// param {string} entity - name of the entity(some obj)
// param {string} collectionName - name of the collection
// param {string} fieldName - name of the field
// param {array} ids - name of the collection
// If you want to get documents by ids from object - pass collectionName, entity and fieldName
// If you want to get documents by ids having the array of ids - pass collectionName, ids
const useGetDocumentsByIds = (params) => {
  const { entity, collection, fieldName, ids } = params

  const [documentsData, setDocumentsData] = useState([])
  const [documentsLoading, setDocumentsLoading] = useState(false)
  const [documentsError, setDocumentsError] = useState(false)

  // [USE_EFFECT]
  useEffect(() => {
    const fetchDocumentsByIds = async ({
      collection,
      entity,
      fieldName,
      ids,
      isIdsFromObject,
      isOnlyIds
    }) => {
      setDocumentsLoading(true)

      const promises = []
      try {
        if (isIdsFromObject) {
          entity?.[fieldName]?.forEach((docId) => {
            const docRef = doc(firestore, collection, docId)
            promises?.push(getDoc(docRef))
          })
        } else if (isOnlyIds) {
          ids?.forEach((docId) => {
            const docRef = doc(firestore, collection, docId)
            promises?.push(getDoc(docRef))
          })
        } else {
          return promises
        }
        // After receiving promises - resolve them
        const response = await Promise.allSettled(promises)
        // Extract features data from each promise
        const documentsData = response?.map((doc) => doc?.value?.data())
        setDocumentsData(documentsData)
        setDocumentsLoading(false)
      } catch (error) {
        // eslint-disable-next-line
        console.error(error)
        setDocumentsError(error)
        setDocumentsLoading(false)
      }
      setDocumentsLoading(false)
    }

    const isIdsFromObject = collection && entity && fieldName
    const isOnlyIds = collection && ids

    if (isIdsFromObject || isOnlyIds) {
      fetchDocumentsByIds({
        entity,
        collection,
        fieldName,
        ids,
        isIdsFromObject,
        isOnlyIds
      })
    }
  }, [entity, collection, fieldName, ids])

  return useMemo(
    () => [documentsData, documentsLoading, documentsError],
    [documentsData, documentsLoading, documentsError]
  )
}

export default useGetDocumentsByIds
