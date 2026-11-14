import ConversationRow from "./ConversationRow"

function ResponseDesk({ onOpenConversation }) {
    return (
        <section className="phone-screen response-desk">
            <ConversationRow
              sender="202-555-0134"
              preview="I lost the trail and it's getting dark"
              time="22:17"
              onOpen={onOpenConversation}
            />
        </section>
    )
}

export default ResponseDesk