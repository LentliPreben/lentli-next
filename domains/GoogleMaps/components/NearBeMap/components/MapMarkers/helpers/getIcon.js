const CATEGORY_ICONS = {
  Briefcase1Outlined: 'assets/map/business.png',
  ShipOutlined: 'assets/map/boat.png',
  Car2Outlined: 'assets/map/car.png',
  Building5Outlined: 'assets/map/real-estate.png',
  Cube1Outlined: 'assets/map/product.png',
  StoreOutlined: 'assets/map/market.png',
  Star6Outlined: 'assets/map/events.png',
  MopedOutlined: 'assets/map/mc-and-engine.png',
  ClocheOutlined: 'assets/map/services.png'
}

const getIcon = (iconName) => {
  const iconPath = iconName || 'Cube1Outlined'

  return CATEGORY_ICONS[iconPath]
}

export default getIcon
