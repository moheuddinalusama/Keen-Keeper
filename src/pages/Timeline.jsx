import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Video, Users, ChevronDown, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Timeline = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('All'); 
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('global_timeline')) || [];
    setActivities(savedData);
  }, []);


  const filteredActivities = filter === 'All' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

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
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-400 text-sm font-bold uppercase tracking-widest hover:border-slate-300 transition-all"
          >
            {filter === 'All' ? 'Filter timeline' : filter}
            <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-lg z-10 overflow-hidden">
              {['All', 'Call', 'Text', 'Video'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilter(type);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-200 hover:text-[#1a2e2a] transition-colors border-b last:border-0 border-slate-50"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

       
        <div className="space-y-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((item) => {
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
              <p className="text-slate-400 font-bold italic tracking-wide">
                No {filter !== 'All' ? filter : ''} activities found.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Timeline;