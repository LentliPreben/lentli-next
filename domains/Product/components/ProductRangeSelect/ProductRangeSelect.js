import { DateRange, DateRangeInputs, Text, Title } from 'components'
import { Divider, Popover, theme } from 'antd'

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
      <div className="row">
        <div className="col-12 flex align-baseline mb-24">
          <Title as="h3">{pricePerDayDisplay}</Title>
          <Text secondary>{`/${t('day')}`}</Text>
        </div>
        <div className="col-12 mb-24">
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
        </div>

        <>
          <div className="col-12">
            <div className="row justify-between">
              <div className="col flex gap-4">
                <Text>{pricePerDayDisplay}</Text>
                <Text secondary>x</Text>
                <Text>{t(computedDayLabel)}</Text>
              </div>
              <div className="col">{pricePerPeriodDisplay}</div>
            </div>
          </div>
          <div className="col-12">
            <Divider />
          </div>
          <div className="col-12 flex justify-between mb-24">
            <Title as="h5">{t('Total')}</Title>
            <Title as="h5">{pricePerPeriodDisplay}</Title>
          </div>
        </>

        <div className="col-12">
          <Button
            block
            size="large"
            type="primary"
            onClick={handleAddItemToCart}>
            {t('Reserve')}
          </Button>
        </div>
      </div>
    </ProductRangeSelectWrapper>
  )
}

export default ProductRangeSelect
