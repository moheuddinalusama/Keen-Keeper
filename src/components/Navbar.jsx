import React, { useState } from 'react';
import { Home, Clock, BarChart3, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // ১. Link এবং useLocation ইমপোর্ট করুন

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    { name: 'Home', icon: <Home size={18} />, path: '/' },
    { name: 'Timeline', icon: <Clock size={18} />, path: '/timeline' },
    { name: 'Stats', icon: <BarChart3 size={18} />, path: '/stats' },
  ];

  return (
    <nav className="bg-emerald-100/60 backdrop-blur-md border-b border-gray-100 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0">
        
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="text-slate-900">Keen</span>
              <span className="text-emerald-800"> Keeper</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => {
          
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-bold text-sm ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-md' 
                      : 'text-slate-500 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-inner">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-md font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-600 hover:bg-emerald-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;