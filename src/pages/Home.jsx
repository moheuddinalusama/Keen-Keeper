import React, { useState, useEffect } from 'react';
import StatsCards from '../components/StatsCards';
import FriendCard from '../components/FriendCard';
const Home = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  
    fetch('/friends.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ডাটা লোড করতে সমস্যা হয়েছে:", err);
        setLoading(false);
      });
  }, []);

  const stats = {
    total: friends.length,
    onTrack: friends.filter(f => f.status === 'on-track').length,
    needAttention: friends.filter(f => f.status === 'overdue').length,
    interactions: 12 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
   

      <main className="flex-grow">
  

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
     
          <StatsCards statsData={stats} />

     
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
              <h2 className="text-2xl font-bold text-[#1a2e2a]">Your Friends</h2>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                Total: {friends.length}
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
                <p className="ml-4 text-slate-500">Loading your connections...</p>
              </div>
            ) : (
        
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {friends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    
    </div>
  );
};

export default Home;