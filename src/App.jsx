import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Herosection from './components/Herosection'
import StatsCards from './components/StatsCards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Herosection></Herosection>
      <StatsCards></StatsCards>
    </>
  )
}

export default App
