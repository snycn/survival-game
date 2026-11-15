import Button from './Button.jsx'

function ConversationRow({ sender, preview, time, onOpen }) {
  return (
    <Button className="conversation-row" onClick={onOpen}>
      <span className="conversation-row__text">
        <span>{sender}</span>
        <span className="conversation-row__preview">{preview}</span>
      </span>
      <time dateTime={time}>{time}</time>
    </Button>
  )
}

export default ConversationRow
