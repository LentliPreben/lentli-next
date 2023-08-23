import TranslationsContext from './TranslationsContext'
import { useContext } from 'react'

const useTranslations = () => useContext(TranslationsContext)

export default useTranslations
