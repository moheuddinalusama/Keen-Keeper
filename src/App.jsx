import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FriendDetails from './pages/FriendDetails';
import Timeline from './pages/Timeline'; 
import Stats from './pages/Stats';       
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />

       
        <Route path="/friend/:id" element={<FriendDetails />} />

  
        <Route path="/timeline" element={<Timeline />} />

        
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;