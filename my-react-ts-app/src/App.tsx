import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header/Header'
import Hello from './components/Hello/Hello'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Hello />
    </>
  )
}

export default App
