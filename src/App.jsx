import { useEffect, useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import LockScreen from './components/LockScreen.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import ResponseDesk from './components/ResponseDesk.jsx'
import ConversationScreen from './components/ConversationScreen.jsx'
import { forestStory } from './data/forestStory.js'
import { readStorySection } from './storyProgress.js'
import { startBackgroundMusic } from './backgroundMusic.js'
import './App.css'

const time = '22:17'
const responseDesk = 'Response\nDesk'

function App() {
  const [screen, setScreen] = useState('lock')
  const [progress, setProgress] = useState(null)

  // Deliver one pending message, then schedule the next after progress updates.
  useEffect(() => {
    if (progress === null || progress.pending.length === 0) return

    const nextMessage = progress.pending[0]
    const timer = setTimeout(() => {
      setProgress({
        nodeId: progress.nodeId,
        messages: progress.messages.concat(nextMessage),
        pending: progress.pending.slice(1),
      })
    }, (nextMessage.typingTime ?? 1000) * 2.025)

    return () => clearTimeout(timer)
  }, [progress])

  function openConversation() {
    if (progress === null) {
      const opening = readStorySection(forestStory, forestStory.startNode)
      setProgress({ nodeId: opening.nodeId, messages: [], pending: opening.messages })
    }
    setScreen('conversation')
  }

  // Browsers block audio until the player interacts, so start the music on the first click or key press.
  useEffect(() => {
    const events = ['pointerdown', 'keydown']
    function start() {
      startBackgroundMusic()
      events.forEach((name) => window.removeEventListener(name, start))
    }
    events.forEach((name) => window.addEventListener(name, start))
    return () => events.forEach((name) => window.removeEventListener(name, start))
  }, [])

  function sendReply(choice) {
    const nextSection = readStorySection(forestStory, choice.next)
    const playerMessage = { text: choice.text, isPlayer: true }

    setProgress({
      nodeId: nextSection.nodeId,
      messages: progress.messages.concat(playerMessage),
      pending: nextSection.messages,
    })
  }

  return (
    <main className="game">
      <PhoneFrame
        time={screen !== 'lock' ? time : undefined}
        onLock={screen === 'home' ? () => setScreen('lock') : undefined}
        onHome={screen === 'response-desk' || screen === 'conversation'
          ? () => setScreen('home')
          : undefined}
      >
        {screen === 'home' ? (
          <HomeScreen
            appName={responseDesk}
            onOpenResponseDesk={() => setScreen('response-desk')}
          />
        ) : screen === 'lock' ? (
          <LockScreen time={time} appName={responseDesk} onUnlock={() => setScreen('home')} />
        ) : screen === 'response-desk' ? (
          <ResponseDesk
            story={forestStory}
            time={time}
            onOpenConversation={openConversation}
          />
        ) : (
          <ConversationScreen
            story={forestStory}
            progress={progress}
            time={time}
            onReply={sendReply}
          />
        )}
      </PhoneFrame>
    </main>
  )
}

export default App
