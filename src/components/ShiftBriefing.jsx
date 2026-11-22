import Button from './Button.jsx'
import './ShiftBriefing.css'

function ShiftBriefing({ onBeginShift }) {
  return (
    <section className="phone-screen shift-briefing" aria-labelledby="shift-briefing-title">
      <header className="shift-briefing__header">
        <p>Response Desk</p>
        <h1 id="shift-briefing-title">Shift handover</h1>
      </header>

      <div className="shift-briefing__message">
        <p>You're on duty as a helpline operator.</p>
        <p>
          Read messages from people in distress and choose your replies carefully.
        </p>
        <p className="shift-briefing__note">Your work phone is ready.</p>
      </div>

      <Button variant="solid" className="shift-briefing__begin" onClick={onBeginShift}>
        Begin shift
      </Button>
    </section>
  )
}

export default ShiftBriefing
