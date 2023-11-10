import { useCallback, useEffect } from 'react'

import Image from 'next/image'
import { Text } from 'components'

const Collapse = (props) => {
  const { name, id, openByDefault = true, children } = props

  const handleOpen = useCallback(() => {
    const collapseWrapper = document.getElementById(`collapse-wrapper-${id}`)
    const collapse = document.getElementById(id)

    collapse?.classList.toggle('active')
    collapseWrapper.classList.toggle('active')

    const panel = document.getElementById(`panel-${id}`)
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null
    } else {
      panel.style.maxHeight = 'fit-content'
    }
  }, [id])

  useEffect(() => openByDefault && handleOpen?.(), [handleOpen, openByDefault])

  return (
    <div className="collapse-wrapper" id={`collapse-wrapper-${id}`}>
      <div id={id} className="collapse" onClick={handleOpen}>
        <Text className="strong">{name}</Text>
        <Image
          width={20}
          height={20}
          alt="Toggle"
          src="/assets/arrow-down.svg"
        />
      </div>
      <div className="panel" id={`panel-${id}`}>
        {children}
      </div>
    </div>
  )
}

export default Collapse
