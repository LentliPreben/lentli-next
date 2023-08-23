import { useCallback } from 'react'

const useFourthLastProductRef = (
  setNumVisible,
  numVisible,
  productsLength,
  fetchNext
) => {
  return useCallback(
    (node) => {
      if (node) {
        // Create a new Intersection Observer. The Intersection Observer API provides
        // a way to asynchronously observe changes in the intersection of a target element
        // with an ancestor element or with a top-level document's viewport.
        const observer = new IntersectionObserver((entries) => {
          // If the node is intersecting (visible in the viewport) and numVisible is less than
          // the total number of products
          if (entries[0].isIntersecting && numVisible < productsLength) {
            // Increase the numVisible state by 8 if the current numVisible state is less than
            // the total number of products, otherwise leave it as it is. This is to ensure
            // that numVisible does not exceed the total number of products.
            setNumVisible((prevNumVisible) =>
              prevNumVisible < productsLength
                ? prevNumVisible + fetchNext
                : prevNumVisible
            )
            // Stop observing the node. This is done because the intersection observer triggers
            // the callback function every time the targeted element enters or leaves the viewport.
            // By stopping the observer after it has triggered the callback function once, we
            // prevent the numVisible state from increasing when the user scrolls back and
            // the fourth last product enters the viewport again.
            observer.unobserve(node)
          }
        })
        // Start observing the node.
        observer.observe(node)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [numVisible, productsLength]
  )
}
export default useFourthLastProductRef
