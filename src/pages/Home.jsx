import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Herosection from '../components/Herosection';
import StatsCards from '../components/StatsCards';
import FriendCard from '../components/FriendCard';
import Footer from '../components/Footer';

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
        console.error("ডাটা লোড করতে সমস্যা হয়েছে:", err);
        setLoading(false);
      });
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
    interactions: 12 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Herosection />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
          <StatsCards statsData={stats} />

          <div className="mt-16">
           
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-50 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1a2e2a]">Your Friends</h2>
                <p className="text-slate-500 text-sm">Manage your connections effectively</p>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search by name..."
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64 shadow-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap">
                  Total: {filteredFriends.length}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
                <p className="ml-4 mt-4 text-slate-500">Loading your connections...</p>
              </div>
            ) : filteredFriends.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredFriends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400">No friends found with that name.</p>
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