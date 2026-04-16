import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
      
 <div className=" flex items-center justify-center">
              <p className="text-2xl font-black text-[#1a2e2a] uppercase tracking-[0.2em] bg-[#f8fafc] px-4">
                Lost in Space
              </p>
            </div>

          <div className="relative mb-8">
            <h1 className="text-[12rem] font-black text-slate-800 leading-none select-none">
              404
            </h1>
           
          </div>

          <h2 className="text-xl font-bold text-slate-700 mb-4">
            Oops! This connection doesn't exist.
          </h2>
          <p className="text-slate-400 mb-10 text-sm leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-8 py-4 bg-[#1a2e2a] text-white rounded-2xl font-bold text-sm hover:bg-emerald-900 transition-all shadow-lg active:scale-95 w-full sm:w-auto justify-center"
            >
              <Home size={18} />
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-8 py-4 bg-white text-slate-600 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-all w-full sm:w-auto justify-center shadow-sm"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;