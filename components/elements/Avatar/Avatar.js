import Image from 'next/image'
import AvatarStyled from './Avatar.styled'
import user from 'public/assets/user.svg'
import { useTranslations } from 'contexts'

const Avatar = (props) => {
  const { size = 34, src } = props
  const { t } = useTranslations()

  const scrComputed = src || user
  const isUserAvatar = !!src

  return (
    <AvatarStyled size={size} isUserAvatar={isUserAvatar}>
      <Image src={scrComputed} alt={t('Avatar')} layout="fill" />
    </AvatarStyled>
  )
}

export default Avatar
