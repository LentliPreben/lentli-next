import typesense from 'typesense'

const TYPESENSE_CLIENT = new typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST, // For Typesense Cloud use xxx.a1.typesense.net
      port: 443, // For Typesense Cloud use 443
      protocol: 'https' // For Typesense Cloud use https
    }
  ],
  connectionTimeoutSeconds: 60,
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY
})

export default TYPESENSE_CLIENT
