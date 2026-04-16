import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Video, Users, ChevronDown, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Timeline = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে গ্লোবাল ডাটা লোড করা
    const savedData = JSON.parse(localStorage.getItem('global_timeline')) || [];
    setActivities(savedData);
  }, []);

  // আইকন এবং কালার সেট করার লজিক
  const getTheme = (type) => {
    switch (type) {
      case 'Meetup': return { icon: <Users size={18} />, color: 'text-amber-500', bg: 'bg-amber-50' };
      case 'Call': return { icon: <Phone size={18} />, color: 'text-slate-400', bg: 'bg-slate-50' };
      case 'Text': return { icon: <MessageSquare size={18} />, color: 'text-slate-400', bg: 'bg-slate-50' };
      case 'Video': return { icon: <Video size={18} />, color: 'text-slate-400', bg: 'bg-slate-50' };
      default: return { icon: <Clock size={18} />, color: 'text-slate-400', bg: 'bg-slate-50' };
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
        <h1 className="text-4xl font-black text-[#1a2e2a] mb-8">Timeline</h1>

        <div className="relative mb-8 w-64">
          <button className="w-full flex items-center justify-between px-4 py-2 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-400 text-sm font-bold uppercase tracking-widest">
            Filter timeline
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((item) => {
              const theme = getTheme(item.type);
              return (
                <div key={item.id} className="group bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-all">
                  <div className={`p-3 rounded-xl ${theme.bg} ${theme.color} group-hover:scale-110 transition-transform`}>
                    {theme.icon}
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold text-base leading-tight">
                      <span className="text-slate-900 font-black">{item.type}</span> with {item.person}
                    </p>
                    <p className="text-slate-400 text-[10px] font-black mt-1 uppercase tracking-widest">
                      {item.date}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold italic">No activities yet. Go to a friend's profile to log one!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Timeline;