import {
  useFetchOnVisible,
  useSetNumVisibleOnResize,
  useGetNearProductsData
} from 'domains/Product/hooks'
import { useRef, useState } from 'react'
import {
  HeadingWrapper,
  TitleWrapper
} from './NearByProductHorizontalList.styled'
import { Space, Typography } from 'antd'
import { Icon } from '@qonsoll/icons'
import { ProductSimpleView } from 'domains/Product/components'
import PropTypes from 'prop-types'
import { StyledSpace } from './NearByProductHorizontalList.styled'
import { useHorizontalScroll, useScreen } from 'hooks'
import { useTranslations } from 'contexts'
import { Link } from 'components'

const NearByProductHorizontalList = ({ products }) => {
  const { t } = useTranslations()

  const { xs } = useScreen()

  const [scrollRef, handleMouseEnter, handleMouseLeave] = useHorizontalScroll()
  const [numVisible, setNumVisible] = useState(0)
  const listContainerRef = useRef(null)
  const filteredProducts = useGetNearProductsData(products, numVisible)
  const productWidth = 220

  // get new items when see 4th items in view
  const fetchOnVisibleRef = useFetchOnVisible(
    setNumVisible,
    numVisible,
    products?.length,
    10
  )
  // get numVisible based on viewport width
  useSetNumVisibleOnResize(setNumVisible, productWidth)
  const getItemKey = (key) =>
    key === numVisible - 1 ? fetchOnVisibleRef : null

  return (
    <>
      {filteredProducts?.length ? (
        <HeadingWrapper xs={xs}>
          <Typography.Title level={xs ? 2 : 1}>
            {t('Near by you')}
          </Typography.Title>
          {xs ? null : (
            <TitleWrapper>
              <Typography.Text>
                {filteredProducts?.length} {t('products')}
              </Typography.Text>
            </TitleWrapper>
          )}
          <div style={{ marginLeft: 'auto' }}>
            <Link href="/products">
              <Space size={0}>
                {t('See all')}
                <Icon
                  name="ChevronRightOutlined"
                  ml={1}
                  fill="currentColor"
                  size={16}
                />
              </Space>
            </Link>
          </div>
        </HeadingWrapper>
      ) : null}
      <StyledSpace
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className="flex gap-8" ref={listContainerRef}>
          {filteredProducts?.slice(0, numVisible).map((product, key) => (
            <div
              style={{ width: productWidth }}
              key={key}
              ref={getItemKey(key)}>
              <ProductSimpleView
                area-label={`product-${key + 1}`}
                product={product}
                isRentee
              />
            </div>
          ))}
        </div>
      </StyledSpace>
    </>
  )
}

NearByProductHorizontalList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default NearByProductHorizontalList
