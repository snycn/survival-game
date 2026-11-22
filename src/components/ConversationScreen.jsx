import { useEffect, useRef } from 'react'
import ReplyPicker from './ReplyPicker.jsx'
import Button from './Button.jsx'
import './ConversationScreen.css'

function ConversationScreen({ story, progress, time, onReply, onRestart }) {
  const transcript = useRef(null)
  const node = story.nodes[progress.nodeId]
  const isTyping = progress.pending.length > 0

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
          {isTyping && (
            <li className="message message--typing" key="typing">
              <span aria-hidden="true">...</span>
              <span className="sr-only">Caller is typing</span>
            </li>
          )}
        </ol>
      </div>

      <footer className="conversation-screen__composer" key={progress.nodeId}>
        {isTyping ? (
          <p>Waiting for reply…</p>
        ) : node.ending ? (
          <div role="status">
            <h2>{node.ending.title}</h2>
            <p>{node.ending.summary}</p>
            <ol className="decision-recap" aria-label="Decision recap">
              {node.ending.recap.map((line) => <li key={line}>{line}</li>)}
            </ol>
            <Button variant="solid" className="restart-scenario" onClick={onRestart}>
              Restart scenario
            </Button>
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
