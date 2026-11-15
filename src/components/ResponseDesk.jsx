import ConversationRow from "./ConversationRow"

function ResponseDesk({ story, time, onOpenConversation }) {
  return (
    <section className="phone-screen response-desk">
      <ConversationRow
        sender={story.sender}
        preview={story.nodes[story.startNode].messages[0].text}
        time={time}
        onOpen={onOpenConversation}
      />
    </section>
  )
}

export default ResponseDesk