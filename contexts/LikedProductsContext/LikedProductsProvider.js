import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '__constants__'
import LikedProductsContext from './LikedProductsContext'
import PropTypes from 'prop-types'
import { getDocument } from 'services/api/firebase'
import { useTranslations } from 'contexts'
import { useHandleError } from 'hooks'

const LikedProductsProvider = ({ children }) => {
  const { t } = useTranslations()
  const handleError = useHandleError()

  const [countLikedProducts, setCountLikedProducts] = useState()
  const [likedProductIds, setLikedProductIds] = useState()
  const [likedProducts, setLikedProducts] = useState([])
  const [loading, setLoading] = useState()
  const [likedDataForTransfer, setLikedDataForTransfer] = useState()

  const getDataForTransfer = () => {
    setLikedDataForTransfer(localStorage.getItem('likedProducts') || '{}')
  }

  const getLikedProducts = useCallback(async () => {
    try {
      setLoading(true)

      const likedProducts = localStorage.getItem('likedProducts') || '[]'

      const likedProductsIdsFormatted = JSON.parse(likedProducts)

      const productsData = await Promise.all(
        likedProductsIdsFormatted?.map(async (productId) => {
          const product = await getDocument(COLLECTIONS.PRODUCTS, productId)
          const previewImageId = product?.mediaObjects?.[0]
          const previewImage = await getDocument(
            COLLECTIONS.MEDIA_OBJECTS,
            previewImageId
          )

          return { ...product, previewImage }
        })
      )

      setLikedProductIds(likedProductsIdsFormatted)
      setCountLikedProducts(likedProductsIdsFormatted?.length)
      setLikedProducts(productsData)
      getDataForTransfer()
    } catch (error) {
      handleError(error, t('Error during getting products'))
    } finally {
      setLoading(false)
    }
    // t function is exhaustive, causes loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLikeProduct = useCallback(
    (productId, value) => {
      const likedProducts = localStorage.getItem('likedProducts') || '[]'

      const likedProductsIdsFormatted = JSON.parse(likedProducts)
      let updatedLikedProducts = [...likedProductsIdsFormatted]
      if (!value) {
        updatedLikedProducts = likedProductsIdsFormatted.filter(
          (id) => id !== productId
        )
      } else {
        updatedLikedProducts = [...likedProductsIdsFormatted, productId]
      }
      localStorage.setItem(
        'likedProducts',
        JSON.stringify(updatedLikedProducts)
      )

      getLikedProducts()
    },
    [getLikedProducts]
  )

  useEffect(() => {
    getLikedProducts()
  }, [getLikedProducts])

  return (
    <LikedProductsContext.Provider
      value={{
        countLikedProducts,
        likedProductIds,
        handleLikeProduct,
        likedProducts,
        likedDataForTransfer,
        loading
      }}>
      {children}
    </LikedProductsContext.Provider>
  )
}

LikedProductsProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default LikedProductsProvider
