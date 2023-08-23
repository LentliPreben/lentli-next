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
        icon: '/assets/phone-inverse.svg',
        text: '466 61 140 / 919 21 890',
        alt: 'Phone'
      },
      {
        icon: '/assets/mail-inverse.svg',
        text: 'admin@reportify.no',
        alt: 'Email'
      },
      {
        icon: '/assets/map-pin-inverse.svg',
        text: 'Ringsevja 2, 3830 Ulefoss',
        alt: 'Address'
      }
    ]
  }
}

export default FOOTER_MENU
