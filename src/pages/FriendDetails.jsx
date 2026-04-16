import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Phone, MessageSquare, Video, 
  Trash2, Archive, BellOff, Clock, Target 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        const foundFriend = data.find((f) => String(f.id) === String(id));
        setFriend(foundFriend);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, [id]);

  const handleCheckIn = (type) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    const newEntry = {
      id: Date.now(),
      type: type,
      person: friend.name,
      date: currentDate,
      title: `${type} with ${friend.name}`,
    };

    setTimeline([newEntry, ...timeline]);
    const existingGlobalTimeline = JSON.parse(localStorage.getItem('global_timeline')) || [];
    localStorage.setItem('global_timeline', JSON.stringify([newEntry, ...existingGlobalTimeline]));

    toast.success(`${type} Logged Successfully!`, {
      style: { borderRadius: '10px', background: '#1a2e2a', color: '#fff' }
    });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${friend.name}?`);
    if (confirmDelete) {
      toast.error(`${friend.name} removed from list`);
      setTimeout(() => navigate('/'), 1500);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-slate-500 font-bold">Loading...</div>;
  if (!friend) return <div className="flex justify-center items-center h-screen text-rose-500 font-bold">Friend not found!</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all mb-8 font-semibold group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm text-center">
              <img src={friend.picture} className="w-20 h-20 rounded-full mx-auto object-cover mb-4 border-2 border-slate-50 shadow-sm" alt="" />
              <h1 className="text-xl font-extrabold text-slate-800">{friend.name}</h1>
              <div className="mt-3 flex flex-col gap-2">
                <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full mx-auto uppercase">{friend.status}</span>
                <span className="bg-[#e2f3ef] text-[#1a2e2a] text-[10px] font-black px-3 py-1 rounded-full mx-auto uppercase">{friend.tags[0]}</span>
              </div>
              <p className="text-slate-500 italic text-sm mt-5">"{friend.bio}"</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50 shadow-sm">
              <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"><BellOff size={16} /> Snooze 2 Weeks</button>
              <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"><Archive size={16} /> Archive</button>
              <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 size={16} /> Delete</button>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-7 rounded-xl border border-slate-100 shadow-sm text-center">
                <p className="text-4xl font-black text-slate-700">{friend.days_since_contact}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Days Since Contact</p>
              </div>
              <div className="bg-white p-7 rounded-xl border border-slate-100 shadow-sm text-center">
                <p className="text-4xl font-black text-slate-700">{friend.goal}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Goal (Days)</p>
              </div>
              <div className="bg-white p-7 rounded-xl border border-slate-100 shadow-sm text-center">
                <p className="text-2xl font-black text-[#1a4731]">{friend.next_due_date}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Next Due</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-slate-800 font-extrabold mb-6 uppercase text-sm tracking-widest">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => handleCheckIn('Call')} className="flex flex-col items-center justify-center p-8 bg-[#f8fafc] rounded-2xl hover:bg-emerald-50 hover:text-emerald-700 transition-all border border-transparent hover:border-emerald-100 group">
                  <Phone size={24} className="text-slate-700 group-hover:text-emerald-600 mb-2" />
                  <span className="text-xs font-black uppercase">Call</span>
                </button>
                <button onClick={() => handleCheckIn('Text')} className="flex flex-col items-center justify-center p-8 bg-[#f8fafc] rounded-2xl hover:bg-emerald-50 hover:text-emerald-700 transition-all border border-transparent hover:border-emerald-100 group">
                  <MessageSquare size={24} className="text-slate-700 group-hover:text-emerald-600 mb-2" />
                  <span className="text-xs font-black uppercase">Text</span>
                </button>
                <button onClick={() => handleCheckIn('Video')} className="flex flex-col items-center justify-center p-8 bg-[#f8fafc] rounded-2xl hover:bg-emerald-50 hover:text-emerald-700 transition-all border border-transparent hover:border-emerald-100 group">
                  <Video size={24} className="text-slate-700 group-hover:text-emerald-600 mb-2" />
                  <span className="text-xs font-black uppercase">Video</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-slate-800 font-extrabold mb-6 flex items-center gap-2 uppercase text-sm tracking-widest">
                <Clock size={18} className="text-emerald-500" /> Recent Activity
              </h3>
              <div className="space-y-3">
                {timeline.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-[#fcfdfe] rounded-xl border border-slate-50 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex items-center gap-4">
                      <div className="text-emerald-600 bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                        {item.type === 'Call' ? <Phone size={16}/> : item.type === 'Text' ? <MessageSquare size={16}/> : <Video size={16}/>}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-700">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FriendDetails;