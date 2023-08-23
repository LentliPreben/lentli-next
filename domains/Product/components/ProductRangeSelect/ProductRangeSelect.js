import { DateRange, DateRangeInputs } from 'components'
import { Col, Divider, Popover, Row, Typography, theme } from 'antd'

import ProductRangeSelectWrapper from './ProductRangeSelect.styled'
import { useCart, useTranslations } from 'contexts'
import { Button } from 'antd'

const ProductRangeSelect = (props) => {
  const {
    productId,
    periodInDays,
    range,
    handleChangeRange,
    pricePerDayDisplay,
    pricePerPeriodDisplay,
    computedDayLabel,
    formattedDateRange,
    disabledDates,
    ...rest
  } = props

  const { t } = useTranslations()
  const token = theme.useToken().token
  const { addCartItem } = useCart()

  const handleAddItemToCart = (event) => {
    event?.stopPropagation()
    addCartItem(productId, range)
  }

  return (
    <ProductRangeSelectWrapper theme={token} {...rest}>
      <Row>
        <Col span={24} className="flex align-baseline mb-24">
          <Typography.Title level={3}>{pricePerDayDisplay}</Typography.Title>
          <Typography.Text type="secondary">{`/${t('day')}`}</Typography.Text>
        </Col>
        <Col span={24} className="mb-24">
          <Popover
            id="date-range-popover"
            content={
              <DateRange
                showHeader
                onChange={handleChangeRange}
                range={range}
                periodInDays={periodInDays}
                formattedDateRange={formattedDateRange}
                disabledDates={disabledDates}
                computedDayLabel={computedDayLabel}
              />
            }
            arrow={false}
            trigger="click">
            <div className="flex-col">
              <DateRangeInputs range={range} onChange={handleChangeRange} />
            </div>
          </Popover>
        </Col>

        <>
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
        </>

        <Col span={24}>
          <Button
            block
            size="large"
            type="primary"
            onClick={handleAddItemToCart}>
            {t('Reserve')}
          </Button>
        </Col>
      </Row>
    </ProductRangeSelectWrapper>
  )
}

export default ProductRangeSelect
