import {
  Body,
  ProductRangeSelectFixedWrapper
} from './ProductRangeSelectFixed.styles'
import { useCallback, useEffect, useState } from 'react'
import { useBreakpoint } from 'hooks'
import { DateRange, Title, Text, Button, Divider } from 'components'
import { useCart, useTranslations } from 'contexts'

const ProductRangeSelectFixed = (props) => {
  const {
    productId,
    disabled,
    periodInDays,
    range,
    handleChangeRange,
    pricePerDayWithFeesDisplay,
    pricePerPeriodWithFeesDisplay,
    computedDayLabel,
    formattedDateRange
  } = props

  const { t } = useTranslations()
  const { xs, sm } = useBreakpoint()
  const { addCartItem } = useCart()

  const [isOpened, setIsOpened] = useState(false)

  const titleLevel = isOpened ? 'h3' : 'h5'
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
      onClick={handleToggle}
      id="product-range-select">
      <div className="row">
        <div className="col-auto mr-auto flex-1">
          <div className="row">
            <div className="col-12 flex align-baseline gap-2">
              <Title as={titleLevel}>{pricePerDayWithFeesDisplay}</Title>
              <Text secondary>{`/${t('day')}`}</Text>
            </div>
            <div className="col-12">
              <Text secondary>{formattedDateRange}</Text>
            </div>
          </div>
        </div>
        {showExtraInHeader && (
          <>
            <div className="col-auto flex flex-col align-end">
              <Text secondary>{t('Total')}</Text>
              <Title as="h5">{pricePerPeriodWithFeesDisplay}</Title>
            </div>
            <div className="col-auto">
              <Divider type="vertical" className="full-height m-0" />
            </div>
            <div className="col-auto flex align-center">
              <Button type="primary" onClick={handleAddItemToCart}>
                {t('Reserve')}
              </Button>
            </div>
          </>
        )}
      </div>

      <Body>
        <div className="row">
          <div className="col-12">
            <DateRange
              showHeader={false}
              onChange={handleChangeRange}
              range={range}
              periodInDays={periodInDays}
            />
          </div>
          <div className="col-12">
            <Divider />
          </div>
          <div className="col-12">
            <div className="row justify-between">
              <div className="col-auto flex gap-4">
                <Text>{pricePerDayWithFeesDisplay}</Text>
                <Text secondary>x</Text>
                <Text>{t(computedDayLabel)}</Text>
              </div>
              <div className="col-auto">{pricePerPeriodWithFeesDisplay}</div>
            </div>
          </div>
          <div className="col-12">
            <Divider />
          </div>
          <div className="col-12 flex justify-between mb-24">
            <Title as="h5">{t('Total')}</Title>
            <Title as="h5">{pricePerPeriodWithFeesDisplay}</Title>
          </div>
          <div className="col-12">
            <Button
              disabled={disabled}
              block
              size="lg"
              type="primary"
              onClick={handleAddItemToCart}>
              {t('Reserve')}
            </Button>
          </div>
        </div>
      </Body>
    </ProductRangeSelectFixedWrapper>
  )
}

export default ProductRangeSelectFixed
