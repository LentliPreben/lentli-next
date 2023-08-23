import { Title, Text } from 'components'
import { useTranslations } from 'contexts'
import { ProductsGlobalSearchInputWithAction } from 'domains/Product/components'

const IntroductorySection = () => {
  const { t } = useTranslations()

  return (
    <section className="introduction-section">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <Title as="mega">{t('Rent easily with Lentli')}</Title>
              </div>
              <div className="col-12 mb-4">
                <Text variant="label" secondary>
                  {t(
                    'Share your location and we will show you which products are near you, book a period suitable for you and use!'
                  )}
                </Text>
              </div>
              <div className="col-12">
                <ProductsGlobalSearchInputWithAction />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroductorySection
