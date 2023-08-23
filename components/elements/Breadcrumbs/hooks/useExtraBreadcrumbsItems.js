import { transformCollectionName, transformName } from '../helpers'
import { useEffect, useState } from 'react'

import { APP_PATHS } from '__constants__'
import { getDocument } from 'services/api/firebase'
import pluralize from 'pluralize'
import { useGetCategories } from 'domains/Category/hooks'
import { useTranslations } from 'contexts'
import { useRouter } from 'next/router'

const breadcrumbNames = Object.fromEntries(
  Object.entries(APP_PATHS).map((a) => a.reverse())
)
const getBreadcrumbItem = (name, url, isId, modelName, documentId) => {
  return {
    name,
    key: url,
    // If isId is true, replace the ':modelNameId' with the actual documentId in the url
    path: isId ? url.replace(`:${modelName}Id`, documentId) : url
  }
}

const useExtraBreadcrumbsItems = (collection) => {
  const [extraItems, setExtraItems] = useState(null)
  const [categories] = useGetCategories()
  const { t } = useTranslations()
  const router = useRouter()
  const params = router.query
  const pathname = router.pathname

  useEffect(() => {
    const extractItems = async () => {
      const pathSnippets = pathname.split('/').filter(Boolean)
      const collectionName = collection || pathSnippets[0]
      const modelName = pluralize.singular(
        collectionName.includes('-')
          ? transformCollectionName(collectionName)
          : collectionName
      )

      const documentId = params?.[`${modelName}Id`]
      if (documentId) pathSnippets[1] = `:${modelName}Id`

      const breadcrumbItems = []

      for (let index = 0; index < pathSnippets.length; index++) {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        const isId = pathSnippets[index].includes('Id')
        const transformedUrl = breadcrumbNames[url] ? url : pluralize(url)
        const transformedName = transformName(breadcrumbNames[transformedUrl])
        let name = t(transformedName)

        if (isId) {
          const document = await getDocument(collectionName, documentId)
          if (document) {
            name =
              document?.name || document?.title || document?.orderNumber || name
            // if document has a parentId, we are dealing with a subcategory,
            // so we add a breadcrumb for 'Products' and for the parent category
            if (document.parentId) {
              const parentCategory = categories?.find(
                (cat) => cat._id === document.parentId
              )
              //
              if (parentCategory) {
                breadcrumbItems.push(
                  getBreadcrumbItem('Products', `/products`, false)
                )
                breadcrumbItems.push(
                  getBreadcrumbItem(
                    parentCategory.name,
                    `/categories/${parentCategory._id}/products`,
                    false
                  )
                )
              }
              // if the document is top level category, we add a 'Products' breadcrumb
            } else if (document.isTopLevel) {
              breadcrumbItems.push(
                getBreadcrumbItem('Products', `/products`, false)
              )
            }
          }
        }
        // If the transformedName is not 'Categories' or 'Category', then add a breadcrumb with the current name and url.
        // This is done to avoid adding breadcrumbs for categories when we are not in a category path.
        if (
          !(transformedName === 'Categories' || transformedName === 'Category')
        ) {
          breadcrumbItems.push(
            getBreadcrumbItem(name, transformedUrl, isId, modelName, documentId)
          )
        }
      }
      setExtraItems(breadcrumbItems.filter(Boolean))
    }

    extractItems()
  }, [pathname, params, t, categories, collection])

  return [extraItems]
}

export default useExtraBreadcrumbsItems
