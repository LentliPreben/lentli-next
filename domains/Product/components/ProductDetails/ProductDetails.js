import { theme, Grid } from 'antd'

import { CANCELLATION_TERMS_TYPES_DESCRIPTION } from '__constants__'
import { formatAddress } from 'utils'
import { useTranslations } from 'contexts'
import { ProductDetailIconWrapper } from './ProductDetails.styles'
import truck from 'public/assets/truck.svg'
import markerPin from 'public/assets/markerPin.svg'
import calendar from 'public/assets/calendar.svg'
import { Text, Title } from 'components'
import Image from 'next/image'

const { useBreakpoint } = Grid

const ProductDetails = (props) => {
  const { product, address } = props

  const { xl } = useBreakpoint()
  const { t } = useTranslations()

  const { colorFillSecondary } = theme.useToken().token
  const cancellationTermsDescription =
    CANCELLATION_TERMS_TYPES_DESCRIPTION?.[product?.cancellationTerms]

  const formattedAddress = formatAddress(address)
  const isRenterDelivery = product?.isRenterDelivery

  const details = [
    {
      title: 'Pick-up location',
      description: formattedAddress,
      src: markerPin
    },
    isRenterDelivery && {
      title: 'Free renter delivery',
      description: 'The lessor will deliver the order to you free of charge.', // temporary mocked data
      src: truck
    },
    {
      title: 'Cancellation terms',
      description: cancellationTermsDescription,
      src: calendar
    }
  ]?.filter((value) => Boolean(value))

  return (
    <div
      className="row gap-y-8"
      gutter={[
        { xs: 0, sm: 0, md: 0, lg: 0, xl: 32 },
        { xs: 24, sm: 24, md: 24, lg: 24, xl: 0 }
      ]}>
      {details?.map(({ title, description, src }) => (
        <div className="col-12 col-xl-4" key={title}>
          <div className="row">
            {!xl && (
              <div className="col-auto">
                <ProductDetailIconWrapper
                  colorFillSecondary={colorFillSecondary}>
                  {src && (
                    <Image src={src} width={18} height={18} alt={title} />
                  )}
                </ProductDetailIconWrapper>
              </div>
            )}
            <div className="col flex-1 flex flex-col">
              <Title as="h5" className="mb-4">
                {t(title)}
              </Title>
              <Text>{t(description)}</Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductDetails
