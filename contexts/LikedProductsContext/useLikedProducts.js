import LikedProductsContext from './LikedProductsContext'
import { useContext } from 'react'

const useLikedProducts = () => useContext(LikedProductsContext)

export default useLikedProducts
