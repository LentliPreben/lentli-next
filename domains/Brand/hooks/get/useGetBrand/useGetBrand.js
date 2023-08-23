import { doc } from 'firebase/firestore'
import { COLLECTIONS } from '__constants__'
import { firestore } from 'services/firebase'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'

const useGetBrand = ({ brandId }) => {
  /* Query for getting collection reference */
  const brandQuery = brandId && doc(firestore, COLLECTIONS.BRANDS, brandId)

  /* Getting collection data */
  return useDocumentDataOnce(brandQuery)
}

export default useGetBrand
