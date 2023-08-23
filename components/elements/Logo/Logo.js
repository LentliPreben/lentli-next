import Image from 'next/image'
import { Link } from 'components'
import LogoWrapper from './Logo.styled'
import { useScreen } from 'hooks'

const Logo = (props) => {
  const { inverse } = props

  const { xs } = useScreen()

  const computedSrc = inverse
    ? '/logos/logo-full-inverse.svg'
    : '/logos/logo-full.svg'

  return (
    <LogoWrapper xs={xs}>
      <Link href="/">
        <Image
          src={computedSrc}
          alt="Lentli"
          layout="fill"
          objectFit="contain"
        />
      </Link>
    </LogoWrapper>
  )
}

export default Logo
