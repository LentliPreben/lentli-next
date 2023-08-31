import Image from 'next/image'
import { Link } from 'components'
import LogoWrapper from './Logo.styled'

const Logo = (props) => {
  const { inverse } = props

  const computedSrc = inverse
    ? '/logos/logo-full-inverse.webp'
    : '/logos/logo-full.webp'

  return (
    <LogoWrapper>
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
