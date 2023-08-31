import { OPTIONS_TYPES } from '../__constants__'
import { useMemo } from 'react'
import { useTranslations } from 'contexts'
import markerPin from 'public/assets/markerPin.svg'
import cube from 'public/assets/cube.svg'
// import dashboard from 'public/assets/dashboard.svg'
import { Text } from 'components'
import Image from 'next/image'

const useAutocompleteOptions = (locations, products, categories) => {
  const { t } = useTranslations()

  return useMemo(
    () =>
      [
        {
          label: (
            <Text className="px-8" secondary>
              {t('Products')}
            </Text>
          ),
          options:
            products?.map((product) => ({
              icon: (
                <Image src={cube} width={12} height={12} alt={t('Products')} />
              ),
              key: product._id,
              label: product?.name,
              value: JSON.stringify({
                id: product._id,
                type: OPTIONS_TYPES.PRODUCT
              })
            })) || [],
          filter: !!products?.length
        },
        {
          label: t('Categories'),
          options:
            categories?.map((category) => ({
              icon: (
                <Image
                  src={dashboard}
                  width={12}
                  height={12}
                  alt={t('Categories')}
                />
              ),
              label: category?.name,
              value: category._id,
              key: category._id
            })) || [],
          filter: !!categories?.length
        },
        {
          label: (
            <Text className="px-8" secondary>
              {t('Locations')}
            </Text>
          ),
          options:
            locations?.slice(0, 3).map(({ place_id, description }) => ({
              icon: (
                <Image
                  src={markerPin}
                  width={12}
                  height={12}
                  alt={t('Location')}
                />
              ),
              label: description,
              value: JSON.stringify({
                id: place_id,
                type: OPTIONS_TYPES.LOCATION
              }),
              key: place_id
            })) || [],
          filter: !!locations?.length
        }
      ].filter((option) => option.filter),
    [categories, locations, products, t]
  )
}

export default useAutocompleteOptions
