import { Text } from 'components'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'

const Accordion = (props) => {
  const { name, id, openByDefault = true, children } = props

  const handleOpen = useCallback(() => {
    const accordionWrapper = document.getElementById(`accordion-wrapper-${id}`)
    const accordion = document.getElementById(id)

    accordion.classList.toggle('active')
    accordionWrapper.classList.toggle('active')

    const panel = document.getElementById(`panel-${id}`)
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null
    } else {
      panel.style.maxHeight = 'fit-content'
    }
  }, [id])

  useEffect(() => openByDefault && handleOpen?.(), [handleOpen, openByDefault])

  return (
    <div className="accordion-wrapper" id={`accordion-wrapper-${id}`}>
      <div id={id} className="accordion" onClick={handleOpen}>
        <Text>{name}</Text>
        <Image
          width={16}
          height={16}
          alt="Toggle"
          src="/assets/arrow-down.svg"
          loading="lazy"
        />
      </div>
      <div className="panel" id={`panel-${id}`}>
        {children}
      </div>
    </div>
  )
}

export default Accordion
