import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import LockScreen from './components/LockScreen.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import ResponseDesk from './components/ResponseDesk.jsx'
import ConversationScreen from './components/ConversationScreen.jsx'
import { forestStory } from './data/forestStory.js'
import { readStorySection } from './storyProgress.js'
import './App.css'

const time = '22:17'
const responseDesk = 'Response\nDesk'

function App() {
  const [screen, setScreen] = useState('lock')
  const [progress, setProgress] = useState(() => readStorySection(forestStory, forestStory.startNode))

  function sendReply(choice) {
    const nextSection = readStorySection(forestStory, choice.next)
    const playerMessage = { text: choice.text, isPlayer: true }

    setProgress({
      nodeId: nextSection.nodeId,
      messages: progress.messages.concat(playerMessage, nextSection.messages),
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
            onOpenConversation={() => setScreen('conversation')}
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
