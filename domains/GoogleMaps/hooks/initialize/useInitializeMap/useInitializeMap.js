import { useLoadScript } from '@react-google-maps/api'

const NEXT_PUBLIC_GOOGLE_MAP_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

const scriptData = {
  language: 'en',
  googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  libraries: ['places']
}

const useInitializeMap = () => {
  // isLoaded, ...
  const result = useLoadScript(scriptData)

  return result
}

export default useInitializeMap
