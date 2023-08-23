import { HEADER_MENU_ITEMS } from '__constants__'
import { Link } from 'components'
import { useTranslations } from 'contexts'

const HeaderMenu = () => {
  const { t } = useTranslations()

  return (
    <menu className="header-menu">
      {HEADER_MENU_ITEMS?.map(({ title, href }) => (
        <Link className="header-menu-item" key={title} href={href}>
          {t(title)}
        </Link>
      ))}
    </menu>
  )
}

export default HeaderMenu
