/**
 * Calculates the final payment including fees for a product.
 * @param {number} p - The cost of the product set by the renter.
 * @returns {number} - The final payment after adding Stripe and platform fees, rounded up to the nearest ten.
 */

const APPLICATION_FEE_AMOUNT = 0.1

const calculateFinalPayment = (p) => {
  // Calculate the price with the platform fee (10% of the product cost) and Stripe fee (3.25% + 2 NOK fixed fee).
  const priceWithFee =
    (p + p * APPLICATION_FEE_AMOUNT + 2) / ((100 - 3.25) / 100)

  // Round up the result to the nearest ten.
  const roundedPrice = Math.ceil(priceWithFee / 10) * 10

  // Return the final rounded payment.
  return roundedPrice
}

export default calculateFinalPayment
