function ReplyPicker({ replies, onChoose }) {
  return (
    <details className="reply-picker">
      <summary>Choose a reply…</summary>
      <div className="reply-picker__options">
        {replies.map((reply) => (
          <button
            type="button"
            key={reply.id}
            onClick={() => onChoose(reply)}
          >
            {reply.text}
          </button>
        ))}
      </div>
    </details>
  )
}

export default ReplyPicker
