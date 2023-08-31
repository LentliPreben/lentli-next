import { Link, RelativeImage } from 'components'

import PropTypes from 'prop-types'
import { currencySymbol } from 'domains/Product/helpers'
import { useTranslations } from 'contexts'
import { Text, Title } from 'components'

const MapProductView = (props) => {
  const { previewImgUrl, _id, name, pricePerDay, currency } = props
  const productCurrencySymbol = currencySymbol(currency)
  const { t } = useTranslations()
  const href = `/products/${_id}`

  return (
    <div style={{ width: '200px' }}>
      <div className="row mb-4 g-2">
        <div className="col-5">
          <RelativeImage src={previewImgUrl} withOverlay={false} />
        </div>
        <div className="col-7">
          <div className="flex gap-4 align-baseline">
            <Title as="h5">{pricePerDay || 'n/a'}</Title>
            <Title as="h5">{productCurrencySymbol}</Title>
            <Text secondary>
              {' / '}
              {t('day')}
            </Text>
          </div>
          <Link href={href}>{t('View details')}</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 flex-1">
          <Text className="brakeAll full-width mb-0">{name}</Text>
        </div>
      </div>
    </div>
  )
}

MapProductView.propTypes = {
  previewImgUrl: PropTypes.string,
  name: PropTypes.string,
  pricePerDay: PropTypes.number,
  currency: PropTypes.string
}

export default MapProductView
