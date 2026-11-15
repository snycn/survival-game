import { createContext, useCallback, useContext } from 'react'
import clickSoundUrl from './assets/audio/clicksfx.mp3'

/* ---- Shake ---------------------------------------------------------------- */

// Provided by PhoneFrame. Outside a phone, shaking is a no-op.
export const PhoneShakeContext = createContext(() => {})

const shakeKeyframes = [
  { transform: 'translate(0, 0) rotate(0)' },
  { transform: 'translate(-3px, 1px) rotate(-0.75deg)' },
  { transform: 'translate(3px, -1px) rotate(0.75deg)' },
  { transform: 'translate(-2px, 0) rotate(-0.4deg)' },
  { transform: 'translate(2px, 0) rotate(0.4deg)' },
  { transform: 'translate(0, 0) rotate(0)' },
]

/** Plays a short shake on `element`, unless the user prefers reduced motion. */
export function shakeElement(element) {
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  element.animate(shakeKeyframes, { duration: 280, easing: 'ease-out' }) // duration in ms
}

/* ---- Click sound ---------------------------------------------------------- */

const CLICK_VOLUME = 0.3 // 0 (silent) to 1 (full)

// One shared, preloaded <audio> so clicks play instantly without re-downloading.
const clickSound = typeof Audio === 'undefined' ? null : new Audio(clickSoundUrl)
if (clickSound) {
  clickSound.preload = 'auto'
  clickSound.volume = CLICK_VOLUME
}

export function playClickSound() {
  if (!clickSound) return
  clickSound.currentTime = 0 // restart so rapid clicks each get a click
  // play() rejects if the browser blocks audio; a missing click isn't worth an error.
  clickSound.play().catch(() => {})
}

/* ---- Combined hook used by Button and Toggle ----------------------------- */

/** Returns a function that gives all press feedback: click sound + phone shake. */
export function usePressFeedback() {
  const shake = useContext(PhoneShakeContext)
  return useCallback(() => {
    playClickSound()
    shake()
  }, [shake])
}
