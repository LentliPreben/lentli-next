import CartContext from './CartContext'
import { useContext } from 'react'

const useCart = () => useContext(CartContext)

export default useCart
