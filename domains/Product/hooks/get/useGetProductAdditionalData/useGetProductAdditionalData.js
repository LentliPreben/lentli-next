import { useGetBrand } from 'domains/Brand/hooks'
import { useGetCategory } from 'domains/Category/hooks'
import { useGetTags } from 'domains/Tag/hooks'
import { useMemo } from 'react'

const useGetProductAdditionalData = (product) => {
  const productData = useMemo(
    () => ({
      tagIds: product?.tags?.length ? product?.tags : [null],
      brandId: product?.brandId ?? null,
      categoryId: product?.categoryId ?? null
    }),
    [product]
  )

  const [brand, brandLoadings] = useGetBrand({ brandId: productData.brandId })
  const [category, categoryLoading] = useGetCategory({
    categoryId: productData.categoryId
  })

  const ref = useMemo(
    () => ({ where: [['_id', 'in', productData?.tagIds]] }),
    [productData.tagIds]
  )

  const [tags, tagsLoading] = useGetTags(ref)

  const computedLoading = useMemo(
    () => brandLoadings || categoryLoading || tagsLoading,
    [brandLoadings, categoryLoading, tagsLoading]
  )
  return { brand, tags, category, loading: computedLoading }
}

export default useGetProductAdditionalData
