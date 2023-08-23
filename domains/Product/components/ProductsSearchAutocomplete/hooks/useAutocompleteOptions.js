import { Col, Space, Typography } from 'antd'

import { Icon } from '@qonsoll/icons'
import { OPTIONS_TYPES } from '../__constants__'
import { useMemo } from 'react'
import { useTranslations } from 'contexts'

const useAutocompleteOptions = (locations, products, categories) => {
  const { t } = useTranslations()

  return useMemo(
    () =>
      [
        {
          label: (
            <Typography.Text type="secondary">{t('Products')}</Typography.Text>
          ),
          options:
            products?.map((product) => ({
              label: (
                <Col span={24} key={product._id}>
                  <Space>
                    <Icon size={12} name="Cube1Outlined" />
                    <Typography.Text>{product?.name}</Typography.Text>
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
          label: (
            <Typography.Text type="secondary">
              {t('Categories')}
            </Typography.Text>
          ),
          options:
            categories?.map((category) => ({
              label: (
                <Col span={24} key={category._id}>
                  <Space>
                    <Icon size={12} name="Dashboard2Outlined" />
                    <Typography.Text>{category?.name}</Typography.Text>
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
          label: (
            <Typography.Text type="secondary">{t('Locations')}</Typography.Text>
          ),
          options:
            locations?.slice(0, 3).map(({ place_id, description }) => ({
              label: (
                <Space>
                  <Icon size={12} name="MarkerPin1Outlined" />
                  <Typography.Text>{description}</Typography.Text>
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
