import messageIcon from '../assets/Pixelart_Generic_Icons_v1_by_ReffPixels/Small (24x24) PNG/White/Messages_White.png'

function LockScreen({ time, appName, onUnlock }) {
  return (
    <section className="phone-screen lock-screen">
      <header className="lock-screen__clock">
        <h1 className="sr-only">Phone locked</h1>
        <time dateTime={time}>{time}</time>
      </header>
      <div className="notification">
        <img className="pixel-art" src={messageIcon} alt="" width={24} height={24} />
        <div>
          <p className="notification__source">{appName}</p>
          <p>Incoming transmission</p>
        </div>
      </div>
      <button className="unlock-button" type="button" onClick={onUnlock}>
        Unlock <span className="unlock-button__arrow" aria-hidden="true" />
      </button>
    </section>
  )
}

export default LockScreen
