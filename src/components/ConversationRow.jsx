
function ConversationRow({sender, preview, time, onOpen}) {
  return (
    <button
      type="button"
      className="conversation-row"
      onClick={onOpen}
    >
      <span className="conversation-row__text">
        <span>{sender}</span>
        <span className="conversation-row__preview">{preview}</span>
      </span>
      <time dateTime={time}>{time}</time>
    </button>
  )
}

export default ConversationRow