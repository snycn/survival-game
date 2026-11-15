import { useEffect, useRef } from 'react'
import ReplyPicker from './ReplyPicker.jsx'
import './ConversationScreen.css'

function ConversationScreen({ story, progress, time, onReply }) {
  const transcript = useRef(null)
  const node = story.nodes[progress.nodeId]

  // Scroll to the newest messages after a story choice.
  useEffect(() => {
    transcript.current.scrollTop = transcript.current.scrollHeight
  }, [progress])

  return (
    <section className="phone-screen conversation-screen">
      <header className="conversation-screen__header">
        <p>Response Desk</p>
        <h1>{story.sender}</h1>
      </header>

      <div
        className="conversation-screen__messages"
        ref={transcript}
        role="log"
        aria-label="Conversation messages"
        tabIndex={0}
      >
        <ol className="message-list">
          {progress.messages.map((message, index) => (
            <li
              className={message.isPlayer ? 'message message--outgoing' : 'message'}
              key={index}
            >
              <span className="sr-only">{message.isPlayer ? 'You:' : 'Caller:'}</span>
              <p>{message.text}</p>
              <time dateTime={time}>{time}</time>
            </li>
          ))}
        </ol>
      </div>

      <footer className="conversation-screen__composer" key={progress.nodeId}>
        {node.ending ? (
          <div role="status">
            <h2>{node.ending.title}</h2>
            <p>{node.ending.summary}</p>
          </div>
        ) : (
          <ReplyPicker
            replies={node.choices}
            onChoose={onReply}
          />
        )}
      </footer>
    </section>
  )
}

export default ConversationScreen
