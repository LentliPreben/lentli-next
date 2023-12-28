const FOOTER_MENU = {
  NAVIGATION: {
    label: 'Navigation',
    items: [
      // translations aren't needed yet
      { text: 'Funksjoner', href: '' },
      { text: 'Hvordan det fungerer', href: '' },
      { text: 'Kontakt oss', href: '' },
      { text: 'Privacy policy', href: '' },
      { text: 'Avtalevilkår', href: '' }
    ]
  },
  CONTACT: {
    items: [
      {
        icon: '/assets/mail-inverse.svg',
        text: 'Support@lentli.no',
        alt: 'Email',
        href: 'mailto:Support@lentli.no'
      },
      {
        icon: '/assets/map-pin-inverse.svg',
        text: '5304 Hetlevik',
        alt: 'Address'
      }
    ]
  }
}

export default FOOTER_MENU
