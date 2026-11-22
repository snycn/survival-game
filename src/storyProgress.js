export function readStorySection(story, nodeId) {
  const messages = []

  while (true) {
    const node = story.nodes[nodeId]

    for (const message of node.messages) {
      messages.push({
        text: message.text,
        isPlayer: false,
        typingTime: message.typingTime,
      })
    }

    if (!node.next) {
      return { nodeId, messages }
    }

    nodeId = node.next
  }
}
