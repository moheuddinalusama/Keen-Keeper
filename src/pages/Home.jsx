import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Herosection from '../components/Herosection';
import StatsCards from '../components/StatsCards';
import FriendCard from '../components/FriendCard';
import Footer from '../components/Footer';


const SearchIcon = ({ size = 20 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-search"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [interactionCount, setInteractionCount] = useState(0); 

  useEffect(() => {

    fetch('/friends.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setFriends(data);
        setFilteredFriends(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("data load probleme", err);
        setLoading(false);
      });

   
    const savedTimeline = JSON.parse(localStorage.getItem('global_timeline')) || [];
    setInteractionCount(savedTimeline.length);
  }, []);


  useEffect(() => {
    const results = friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(results);
  }, [searchTerm, friends]);

  const stats = {
    total: friends.length,
    onTrack: friends.filter(f => f.status === 'on-track').length,
    needAttention: friends.filter(f => f.status === 'overdue').length,
    interactions: interactionCount 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Herosection />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
       
          <StatsCards statsData={stats} />

          <div className="mt-16">
        
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-gray-100 pb-8 transition-all duration-500">
              <div>
                <h2 className="text-3xl font-black text-[#1a2e2a] tracking-tight">Your Friends</h2>
                <p className="text-slate-500 text-sm mt-1 font-medium">Manage and nurture your connections effectively</p>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
             
                <div className="relative group w-full md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <SearchIcon size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search friends by name..."
                    className="w-full pl-11 pr-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm hover:border-gray-300"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

          
                <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm whitespace-nowrap">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Total: {filteredFriends.length}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center py-32 transition-opacity duration-500 opacity-100">
                <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-emerald-800 border-t-emerald-800/10 border-b-emerald-800/10 border-l-emerald-800"></div>
                <p className="mt-6 text-slate-400 font-bold animate-pulse tracking-wide text-sm">Loading your connections...</p>
              </div>
            ) : filteredFriends.length > 0 ? (
            
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {filteredFriends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            ) : (
           
              <div className="text-center py-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 animate-in fade-in duration-500">
                <div className="text-slate-300 mb-6 flex justify-center">
                   <svg size={48} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                   </svg>
                </div>
                <p className="text-slate-400 font-bold text-lg tracking-wide">No friends found with that name.</p>
                <p className="text-slate-300 text-sm mt-1 font-medium">Try a different search term or check spelling.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;