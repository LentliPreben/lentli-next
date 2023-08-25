import { Button } from 'antd'

import { useTranslations } from 'contexts'
import { ProductLike } from 'domains/Product/components'

const useGetProductCustomActions = (props) => {
  const layout = props?.layout || 'horizontal'
  const productId = props?.productId

  const { t } = useTranslations()

  const shareDropdownMenu = [
    {
      label: t('Mail'),
      icon: (
        <Button
          className="flex align-center justify-center p-0 m-0"
          type="link">
          {/* temporary commented. it needs change Icon 
          <Icon name="MailFilled" size={16} mr={2} /> */}
        </Button>
      ),
      key: 'MailFilled'
    },
    {
      label: t('Facebook'),
      icon: (
        <Button
          className="flex align-center justify-center p-0 m-0"
          type="link">
          {/* temporary commented. it needs change Icon 
           <Icon name="FacebookOutlined" size={16} mr={2} /> */}
        </Button>
      ),
      key: 'FacebookFilled'
    },
    {
      label: t('Twitter'),
      icon: (
        <Button
          className="flex align-center justify-center p-0 m-0"
          type="link">
          {/* temporary commented. it needs change Icon 
           <Icon name="Twitter1Outlined" size={16} mr={2} /> */}
        </Button>
      ),
      key: 'Twitter1Outlined'
    }
  ]

  const actions = (
    <div
      className={`flex ${
        layout !== 'horizontal' && 'flex-col'
      } justify-between gap-12`}>
      <ProductLike productId={productId} />
      {/*  temporary commented
      <Dropdown
        id="like-product"
        key="like-product"
        menu={{ items: shareDropdownMenu }}
        placement="bottomRight">
        <Button
          className="flex align-center justify-center"
          icon={<Image src={share} width={18} height={18} alt={t('Share')} />}
        />
      </Dropdown> */}
    </div>
  )

  return actions
}

export default useGetProductCustomActions
