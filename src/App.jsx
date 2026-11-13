import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import LockScreen from './components/LockScreen.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import './App.css'

const time = '22:17'
const responseDesk = 'Response Desk'

function App() {
  const [unlocked, setUnlocked] = useState(false)

  return (
    <main className="game">
      <PhoneFrame time={unlocked ? time : undefined}>
        {unlocked ? (
          <HomeScreen appName={responseDesk} />
        ) : (
          <LockScreen time={time} appName={responseDesk} onUnlock={() => setUnlocked(true)} />
        )}
      </PhoneFrame>
    </main>
  )
}

export default App
