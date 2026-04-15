import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Herosection from './components/Herosection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Herosection></Herosection>
    </>
  )
}

export default App
