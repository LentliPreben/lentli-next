import { Col, Space } from 'antd'

import { OPTIONS_TYPES } from '../__constants__'
import { useMemo } from 'react'
import { useTranslations } from 'contexts'
import markerPin from 'public/assets/markerPin.svg'
import cube from 'public/assets/cube.svg'
import dashboard from 'public/assets/dashboard.svg'
import { Text } from 'components'
import Image from 'next/image'

const useAutocompleteOptions = (locations, products, categories) => {
  const { t } = useTranslations()

  return useMemo(
    () =>
      [
        {
          label: <Text secondary>{t('Products')}</Text>,
          options:
            products?.map((product) => ({
              label: (
                <Col span={24} key={product._id}>
                  <Space>
                    <Image
                      src={cube}
                      width={12}
                      height={12}
                      alt={t('Products')}
                    />
                    <Text>{product?.name}</Text>
                  </Space>
                </Col>
              ),
              value: JSON.stringify({
                id: product._id,
                type: OPTIONS_TYPES.PRODUCT
              })
            })) || [],
          filter: !!products?.length
        },
        {
          label: <Text secondary>{t('Categories')}</Text>,
          options:
            categories?.map((category) => ({
              label: (
                <Col span={24} key={category._id}>
                  <Space>
                    <Image
                      src={dashboard}
                      width={12}
                      height={12}
                      alt={t('Categories')}
                    />
                    <Text>{category?.name}</Text>
                  </Space>
                </Col>
              ),
              value: JSON.stringify({
                id: category._id,
                type: OPTIONS_TYPES.CATEGORY
              })
            })) || [],
          filter: !!categories?.length
        },
        {
          label: <Text secondary>{t('Locations')}</Text>,
          options:
            locations?.slice(0, 3).map(({ place_id, description }) => ({
              label: (
                <Space>
                  <Image
                    src={markerPin}
                    width={12}
                    height={12}
                    alt={t('Location')}
                  />
                  <Text>{description}</Text>
                </Space>
              ),
              value: JSON.stringify({
                id: place_id,
                type: OPTIONS_TYPES.LOCATION
              })
            })) || [],
          filter: !!locations?.length
        }
      ].filter((option) => option.filter),
    [categories, locations, products, t]
  )
}

export default useAutocompleteOptions
