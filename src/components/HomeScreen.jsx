import { useEffect, useRef } from 'react'
import Button from './Button.jsx'
import messageIcon from '../assets/Pixelart_Generic_Icons_v1_by_ReffPixels/Small (24x24) PNG/White/Messages_White.png'

function HomeScreen({ appName, onOpenResponseDesk }) {
  const heading = useRef(null)

  useEffect(() => {
    heading.current.focus()
  }, [])

  return (
    <section className="phone-screen home-screen">
      <h1 className="sr-only" ref={heading} tabIndex={-1}>Home</h1>
      <Button className="app-tile" onClick={onOpenResponseDesk}>
        <span className="app-tile__icon">
          <img className="pixel-art" src={messageIcon} alt="" width={48} height={48} />
          <span className="app-tile__badge" aria-hidden="true">1</span>
        </span>
        <span>{appName}<span className="sr-only">, 1 unread transmission</span></span>
      </Button>
    </section>
  )
}

export default HomeScreen
