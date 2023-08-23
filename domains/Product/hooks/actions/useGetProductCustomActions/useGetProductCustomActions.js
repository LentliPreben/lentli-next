import { Button, Dropdown, theme } from 'antd'

import { Icon } from '@qonsoll/icons'
import { useTranslations } from 'contexts'
import { ProductLike } from 'domains/Product/components'

const useGetProductCustomActions = (props) => {
  const layout = props?.layout || 'horizontal'
  const productId = props?.productId

  const { t } = useTranslations()

  const { colorTextTertiary } = theme.useToken().token

  const shareDropdownMenu = [
    {
      label: t('Mail'),
      icon: (
        <Button
          className="flex align-center justify-center p-0 m-0"
          type="link">
          <Icon name="MailFilled" size={16} mr={2} fill={colorTextTertiary} />
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
          <Icon name="FacebookOutlined" size={16} mr={2} />
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
          <Icon name="Twitter1Outlined" size={16} mr={2} />
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
      <Dropdown
        id="like-product"
        key="like-product"
        menu={{ items: shareDropdownMenu }}
        placement="bottomRight">
        <Button
          className="flex align-center justify-center"
          icon={<Icon name="Share7Outlined" size={16} />}
        />
      </Dropdown>
    </div>
  )

  return actions
}

export default useGetProductCustomActions
