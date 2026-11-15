import Button from './Button.jsx'
import Toggle from './Toggle.jsx'

function ReplyPicker({ replies, onChoose }) {
  return (
    <Toggle className="reply-picker" label="Choose a reply…">
      <div className="reply-picker__options">
        {replies.map((reply) => (
          <Button
            variant="solid"
            key={reply.id}
            onClick={() => onChoose(reply)}
          >
            {reply.text}
          </Button>
        ))}
      </div>
    </Toggle>
  )
}

export default ReplyPicker
