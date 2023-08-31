import TagStyled from './Tag.styled'
import Image from 'next/image'
import closeDark from 'public/assets/closeDark.svg'
import { useTranslations } from 'contexts'

const Tag = (props) => {
  const { children, closable, onClose } = props

  const { t } = useTranslations()

  return (
    <TagStyled>
      {children}
      {closable && (
        <Image
          width={12}
          height={12}
          src={closeDark}
          alt={t('Close')}
          onClick={onClose}
        />
      )}
    </TagStyled>
  )
}

export default Tag
