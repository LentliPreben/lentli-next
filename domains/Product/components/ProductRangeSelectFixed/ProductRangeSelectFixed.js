import {
  Body,
  ProductRangeSelectFixedWrapper
} from './ProductRangeSelectFixed.styles'
import { Button, Col, Divider, Row, Typography, theme } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useScreen } from 'hooks'
import { DateRange } from 'components'
import { useCart, useTranslations } from 'contexts'

const { Title, Text } = Typography

const ProductRangeSelectFixed = (props) => {
  const {
    productId,
    disabled,
    periodInDays,
    range,
    handleChangeRange,
    pricePerDayDisplay,
    pricePerPeriodDisplay,
    computedDayLabel,
    formattedDateRange
  } = props

  const { t } = useTranslations()
  const token = theme.useToken().token
  const { xs, sm } = useScreen()
  const { addCartItem } = useCart()

  const [isOpened, setIsOpened] = useState(false)

  const titleLevel = isOpened ? 3 : 5
  const showExtraInHeader = !isOpened

  const handleToggle = (event) => {
    event.stopPropagation()
    setIsOpened((prevValue) => !prevValue)
  }

  const checkClicking = useCallback(
    (event) => {
      if (event?.target?.id !== 'product-range-select') {
        isOpened && setIsOpened(false)
      }
    },
    [isOpened]
  )
  const handleAddItemToCart = async (event) => {
    event?.stopPropagation()
    await addCartItem(productId, range)
    setIsOpened(false)
  }
  useEffect(() => {
    document.addEventListener('click', checkClicking)

    return () => document.removeEventListener('click', checkClicking)
  }, [isOpened, checkClicking])

  return (
    <ProductRangeSelectFixedWrapper
      isOpened={isOpened}
      xs={xs}
      sm={sm}
      theme={token}
      onClick={handleToggle}
      id="product-range-select">
      <Row>
        <Col className="mr-auto flex-1">
          <Row>
            <Col span={24} className="flex align-baseline">
              <Title level={titleLevel}>{pricePerDayDisplay}</Title>
              <Text type="secondary">{`/${t('day')}`}</Text>
            </Col>
            <Col span={24} className="min-content-width">
              <Text type="secondary">{formattedDateRange}</Text>
            </Col>
          </Row>
        </Col>
        {showExtraInHeader && (
          <>
            <Col className="flex flex-col align-end">
              <Text type="secondary">{t('Total')}</Text>
              <Title level={5}>{pricePerPeriodDisplay}</Title>
            </Col>
            <Col>
              <Divider type="vertical" className="full-height mx-16" />
            </Col>
            <Col className="flex align-center">
              <Button type="primary" onClick={handleAddItemToCart}>
                {t('Reserve')}
              </Button>
            </Col>
          </>
        )}
      </Row>

      <Body>
        <Row>
          <Col span={24}>
            <DateRange
              showHeader={false}
              onChange={handleChangeRange}
              range={range}
              periodInDays={periodInDays}
            />
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={24}>
            <Row gutter={16} className="justify-between">
              <Col className="flex gap-4">
                <Typography.Text>{pricePerDayDisplay}</Typography.Text>
                <Typography.Text type="secondary">x</Typography.Text>
                <Typography.Text>{t(computedDayLabel)}</Typography.Text>
              </Col>
              <Col>{pricePerPeriodDisplay}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={24} className="flex justify-between mb-24">
            <Typography.Title level={5}>{t('Total')}</Typography.Title>
            <Typography.Title level={5}>
              {pricePerPeriodDisplay}
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Button
              disabled={disabled}
              block
              size="large"
              type="primary"
              onClick={handleAddItemToCart}>
              {t('Reserve')}
            </Button>
          </Col>
        </Row>
      </Body>
    </ProductRangeSelectFixedWrapper>
  )
}

export default ProductRangeSelectFixed
