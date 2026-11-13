import frame from '../assets/Pixelized_Phone_2/Model_02/Black/empty.png'

function PhoneFrame({ children, time }) {
  return (
    <div className="phone">
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
      </div>
    </div>
  )
}

export default PhoneFrame
