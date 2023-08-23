import { TYPESENSE_CLIENT } from '../../../services'

const getDocuments = async (collection, searchQuery) => {
  const requestResult = await TYPESENSE_CLIENT.collections(collection)
    .documents()
    .search(searchQuery)

  const documents = requestResult?.hits?.map((hit) => hit.document) || []
  const facets = requestResult?.facet_counts || []
  const totalSearchResults = requestResult?.found || 0 // total number of documents found (for pagination)
  return { documents, facets, totalSearchResults }
}

export default getDocuments
