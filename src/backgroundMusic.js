import track1Url from './assets/audio/background_music1.mp3'
import track2Url from './assets/audio/background_music2.mp3'

const MUSIC_VOLUME = 0.35 // 0 (silent) to 1 (full)
const MIN_SILENCE_MS = 5000
const MAX_SILENCE_MS = 10000

let tracks = null
let current = 0
let started = false
let inSilence = false // true between tracks
let silenceTimer = null

function createTracks() {
  return [track1Url, track2Url].map((url) => {
    const audio = new Audio(url)
    audio.preload = 'none' // the files are large; each one loads when it's needed
    audio.volume = MUSIC_VOLUME
    audio.addEventListener('ended', playNextTrackAfterSilence)
    return audio
  })
}

function randomSilenceMs() {
  return MIN_SILENCE_MS + Math.random() * (MAX_SILENCE_MS - MIN_SILENCE_MS)
}

function playCurrentTrack() {
  const track = tracks[current]
  track.currentTime = 0
  resumeCurrentTrack()

  // Start buffering the other track now so it's ready after the silence.
  tracks[(current + 1) % tracks.length].preload = 'auto'
}

function resumeCurrentTrack() {
  tracks[current].play().catch(() => {
    // Browser blocked playback (no user gesture yet); allow a later retry.
    started = false
  })
}

function startSilence() {
  inSilence = true
  silenceTimer = setTimeout(() => {
    silenceTimer = null
    inSilence = false
    playCurrentTrack()
  }, randomSilenceMs())
}

function playNextTrackAfterSilence() {
  current = (current + 1) % tracks.length
  startSilence()
}

// Pause while the tab is hidden (switched tabs, minimized, screen locked); resume when it's back.
function handleVisibilityChange() {
  if (!started) return

  if (document.hidden) {
    if (inSilence) {
      clearTimeout(silenceTimer) // freeze the gap so the next track doesn't start in the background
      silenceTimer = null
    } else {
      tracks[current].pause()
    }
  } else if (inSilence) {
    startSilence() // a fresh 5–10 s gap, then the next track
  } else {
    resumeCurrentTrack() // continue from where it paused
  }
}

/**
 * Starts the alternating background music: track 1, 5–10 s of silence, track 2,
 * 5–10 s of silence, and so on. Pauses while the tab is hidden.
 * Safe to call repeatedly; only the first successful call starts it.
 * Must be called from a user gesture (click/keypress), or the browser blocks the audio.
 */
export function startBackgroundMusic() {
  if (started || typeof Audio === 'undefined') return
  started = true
  if (!tracks) {
    tracks = createTracks()
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }
  playCurrentTrack()
}
