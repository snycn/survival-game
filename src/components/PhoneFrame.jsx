import { useCallback, useRef } from 'react'
import Button from './Button.jsx'
import { PhoneShakeContext, shakeElement } from '../pressFeedback.js'
import homeIcon from '../assets/pixelarticons/home.svg'
import lockIcon from '../assets/pixelarticons/lock.svg'
import frame from '../assets/Pixelized_Phone_2/Model_01/Black/empty.png'

function PhoneFrame({ children, time, onHome, onLock }) {
  const navigationAction = onLock ?? onHome
  const phone = useRef(null)
  const shake = useCallback(() => shakeElement(phone.current), [])

  return (
    <PhoneShakeContext value={shake}>
      <div className="phone" ref={phone}>
        <img className="phone__frame pixel-art" src={frame} alt="" width={160} height={336} />
        <div className="phone__display">
          <div className="phone__status">
            <span className="phone__signal" aria-hidden="true">
              <i /><i /><i /><i />
            </span>
            {time && <time dateTime={time}>{time}</time>}
            <span className="phone__battery" aria-hidden="true" />
          </div>
          {children}
          {navigationAction && (
            <Button
              className="phone__nav-button"
              onClick={navigationAction}
              aria-label={onLock ? 'Lock phone' : 'Go to Home screen'}
            >
              <img src={onLock ? lockIcon : homeIcon} alt="" width={24} height={24} />
            </Button>
          )}
        </div>
      </div>
    </PhoneShakeContext>
  )
}

export default PhoneFrame
