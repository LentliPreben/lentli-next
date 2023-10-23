import PropTypes from 'prop-types'
import { useEffect, useState, useCallback } from 'react'
import TranslationsContext from './TranslationsContext'
import { LANGUAGES } from '__constants__'
import { database } from 'services/firebase'
import { ref as dbRef, onValue, update } from 'firebase/database'
import md5 from 'md5'
import { LoadingBox } from 'components'
import { notification } from 'utils'

const NEXT_PUBLIC_TRANSLATIONS_APPLICATION_NAME =
  process.env.NEXT_PUBLIC_TRANSLATIONS_APPLICATION_NAME
const NEXT_PUBLIC_CUSTOM_URL_EN = process.env.NEXT_PUBLIC_CUSTOM_URL_EN

const STORAGE_KEY = 'language'

const TranslationsProvider = ({ children }) => {
  // State that indicates current language
  const [language, setLanguage] = useState()
  // State that indicates downloaded translations from the DB
  const [translations, setTranslations] = useState({})
  // Loading state
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isStorageLoaded, setIsStorageLoaded] = useState(false)

  // Function set current language to the LS and provider state
  const setCurrentLanguage = async (language) => {
    setLanguage(language)
    window?.localStorage.setItem(STORAGE_KEY, language)
  }
  const onWrite = useCallback(
    ({ ref, value }) => update(dbRef(database, ref), value),
    []
  )
  const onRead = useCallback(({ ref: path, setTranslations, options }) => {
    // try/catch block is over handleRead function
    onValue(
      dbRef(database, path),
      (snapshot) => setTranslations(snapshot?.val() || {}),
      options
    )
  }, [])
  const saveTranslationForLanguage = ({ textLabel, shortCode, refEnding }) => {
    try {
      return new Promise((resolve, reject) => {
        // shortCode - could be passed from the outside, should be a language short code
        // refEnding - could be passed from the outside, but it should always be a string md5-hash
        if (!shortCode || !refEnding) {
          reject(
            `appNameComputed(${NEXT_PUBLIC_TRANSLATIONS_APPLICATION_NAME}), shortCode(${shortCode}) and refEnding(${refEnding}) - are required parameters`
          )
        }
        /* Creating a reference to the database. */
        const ref = `translations/${NEXT_PUBLIC_TRANSLATIONS_APPLICATION_NAME}/${shortCode}`

        resolve(onWrite?.({ ref, value: { [refEnding]: textLabel } }))
      })
    } catch (error) {
      notification({
        type: 'error',
        message: t('Error during saving translations')
      })
    }
  }
  // Function that looks like i18n t
  const t = (label) => {
    if (typeof label === 'string' && label) {
      // Use a hash as a key for translation
      const md5Label = md5(label)
      const DBLabel = translations?.[md5Label]

      if (!DBLabel && loaded && Object.keys(translations).length) {
        //Save new translations automatically, try/catch block is inside saveTranslationForLanguage
        LANGUAGES?.forEach((lang) =>
          saveTranslationForLanguage({
            textLabel: label,
            refEnding: md5Label || label,
            shortCode: lang?.shortCode
          })
        )
      }
      return DBLabel || label
    } else {
      console.warn(
        `Wrong value was passed in the translation function. Type of value is ${typeof label}`
      )
      return ''
    }
  }

  // LISTENERS
  useEffect(() => {
    const getStorage = () => {
      const LSLang = window?.localStorage?.getItem(STORAGE_KEY)
      if (!LSLang) {
        const hostname = window.location.hostname

        const defaultLanguage =
          hostname === NEXT_PUBLIC_CUSTOM_URL_EN ? 'en' : 'no'

        window?.localStorage.setItem(STORAGE_KEY, defaultLanguage)
        setLanguage(defaultLanguage)
      } else {
        setLanguage(LSLang)
      }
      setIsStorageLoaded(true)
    }
    getStorage()
  }, [])

  // Fetching translations from the DB
  useEffect(() => {
    let isComponentMounted = true
    const ref =
      language &&
      `translations/${NEXT_PUBLIC_TRANSLATIONS_APPLICATION_NAME}/${language}`

    const fetchTranslations = async () => {
      try {
        if (ref) {
          setLoading(true)

          onRead?.({
            ref,
            setTranslations,
            options: { onlyOnce: false }
          })

          setLoading(false)
          setLoaded(true)
        }
      } catch (error) {
        notification({
          type: 'error',
          message: t('Error during getting translations')
        })
      }
    }

    isComponentMounted && isStorageLoaded && fetchTranslations()

    return () => {
      isComponentMounted = false
    }
  }, [language, isStorageLoaded, onRead])

  return (
    <TranslationsContext.Provider
      value={{
        setCurrentLanguage,
        language,
        translations,
        saveTranslationForLanguage,
        loading,
        languages: LANGUAGES,
        translationsRDBRef: `translations/${NEXT_PUBLIC_TRANSLATIONS_APPLICATION_NAME}/${language}`,
        t
      }}>
      <LoadingBox loading={loading}>{children}</LoadingBox>
    </TranslationsContext.Provider>
  )
}

TranslationsProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default TranslationsProvider
