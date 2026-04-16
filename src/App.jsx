import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Herosection from './components/Herosection'
import StatsCards from './components/StatsCards'
import Footer from './components/Footer'
import FriendCard from './components/FriendCard'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Herosection></Herosection>
      <FriendCard></FriendCard>
      <Home></Home>
      <Footer></Footer>
    </>
  )
}

export default App
