import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import LockScreen from './components/LockScreen.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import ResponseDesk from './components/ResponseDesk.jsx'
import ConversationScreen from './components/ConversationScreen.jsx'
import './App.css'

const time = '22:17'
const responseDesk = 'Response\nDesk'

function App() {
  const [screen, setScreen] = useState('lock')

  return (
    <main className="game">
      <PhoneFrame time={screen !== 'lock' ? time : undefined}>
        {screen === 'home' ? (
          <HomeScreen appName={responseDesk} onOpenResponseDesk={() => setScreen('response-desk')}/>
        ) : screen === 'lock' ? (
          <LockScreen time={time} appName={responseDesk} onUnlock={() => setScreen('home')} />
        ) : screen === 'response-desk' ? (
          <ResponseDesk onOpenConversation={() => setScreen('conversation')} />
        ) : <ConversationScreen />}
      </PhoneFrame>
    </main>
  )
}

export default App
