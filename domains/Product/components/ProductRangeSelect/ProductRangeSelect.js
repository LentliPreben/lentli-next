import {
  DateRange,
  DateRangeInputs,
  Text,
  Title,
  Button,
  Popover,
  Divider
} from 'components'

import ProductRangeSelectWrapper from './ProductRangeSelect.styled'
import { useCart, useTranslations } from 'contexts'

const ProductRangeSelect = (props) => {
  const {
    productId,
    periodInDays,
    range,
    handleChangeRange,
    pricePerDayWithFeesDisplay,
    pricePerPeriodWithFeesDisplay,
    computedDayLabel,
    formattedDateRange,
    disabledDates,
    ...rest
  } = props

  const { t } = useTranslations()
  const { addCartItem } = useCart()

  const handleAddItemToCart = (event) => {
    event?.stopPropagation()
    addCartItem(productId, range)
  }

  return (
    <ProductRangeSelectWrapper {...rest}>
      <div className="row">
        <div className="col-12 flex align-baseline mb-24 gap-2">
          <Title as="h3">{pricePerDayWithFeesDisplay}</Title>
          <Text secondary>{`/${t('day')}`}</Text>
        </div>
        <div className="col-12 mb-24">
          <Popover
            id="date-range-popover"
            overlay={
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
            <div className="row justify-between align-center">
              <div className="col-auto flex gap-4">
                <Text>{pricePerDayWithFeesDisplay}</Text>
                <Text secondary>x</Text>
                <Text>{t(computedDayLabel)}</Text>
              </div>
              <div className="col-auto">
                <Text>{pricePerPeriodWithFeesDisplay}</Text>
              </div>
            </div>
          </div>
          <div className="col-12">
            <Divider />
          </div>
          <div className="col-12 flex justify-between mb-24">
            <Title as="h5">{t('Total')}</Title>
            <Title as="h5">{pricePerPeriodWithFeesDisplay}</Title>
          </div>
        </>

        <div className="col-12">
          <Button block type="primary" onClick={handleAddItemToCart}>
            {t('Reserve')}
          </Button>
        </div>
      </div>
    </ProductRangeSelectWrapper>
  )
}

export default ProductRangeSelect
