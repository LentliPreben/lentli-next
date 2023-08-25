import Image from 'next/image'
import { Link } from 'components'
import LogoWrapper from './Logo.styled'
import { useScreen } from 'hooks'

const Logo = (props) => {
  const { inverse } = props

  const { xs } = useScreen()

  const computedSrc = inverse
    ? '/logos/logo-full-inverse.webp'
    : '/logos/logo-full.webp'

  return (
    <LogoWrapper xs={xs}>
      <Link href="/">
        <Image
          src={computedSrc}
          alt="Lentli"
          loading="lazy"
          width={110}
          height={28}
        />
      </Link>
    </LogoWrapper>
  )
}

export default Logo
