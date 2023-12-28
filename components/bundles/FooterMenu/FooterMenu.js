import { Link, Text } from 'components'
import Image from 'next/image'

const FooterMenu = (props) => {
  const { items } = props

  return (
    <div className="flex flex-col gap-8">
      {items?.map(({ text, href, icon, alt }) =>
        icon ? (
          <div key={text} className="d-flex align-items-center">
            <div className="me-2">
              <Image
                src={icon}
                alt={alt}
                width={16}
                height={16}
                loading="lazy"
              />
            </div>
            {href ? (
              <Link href={href}>
                <Text variant="body2" inverse>
                  {text}
                </Text>
              </Link>
            ) : (
              <Text variant="body2" inverse>
                {text}
              </Text>
            )}
          </div>
        ) : (
          <div key={text}>
            <Link href={href}>
              <Text variant="body2" inverse>
                {text}
              </Text>
            </Link>
          </div>
        )
      )}
    </div>
  )
}

export default FooterMenu
