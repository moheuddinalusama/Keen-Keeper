import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Stats = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে গ্লোবাল টাইমলাইন ডাটা গেট করা
    const savedData = JSON.parse(localStorage.getItem('global_timeline')) || [];
    
    // ডাটা প্রসেস করে চার্টের ফরম্যাটে সাজানো
    const counts = savedData.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));

    setChartData(formattedData);
  }, []);

  // স্ক্রিনশট অনুযায়ী কালার প্যালেট
  const COLORS = {
    'Call': '#1a4731',   // ডার্ক গ্রিন
    'Text': '#7c3aed',   // পার্পল
    'Video': '#10b981',  // এমারেল্ড গ্রিন
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
        {/* টাইটেল সেকশন */}
        <h1 className="text-4xl font-black text-[#1a2e2a] mb-12 tracking-tight">
          Friendship Analytics
        </h1>
        
        {/* চার্ট কন্টেইনার কার্ড */}
        <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm min-h-[500px] flex flex-col">
          <h3 className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mb-8">
            By Interaction Type
          </h3>
          
          <div className="flex-grow flex items-center justify-center">
            {chartData.length > 0 ? (
              <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}  
                      outerRadius={110}
                      paddingAngle={8}   
                      dataKey="value"
                      stroke="none"    
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[entry.name] || '#cbd5e1'} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      formatter={(value) => (
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 w-full">
                <p className="text-slate-400 font-bold italic tracking-wide">
                  No interaction data recorded yet. <br />
                  <span className="text-xs font-medium not-italic">Go to a profile and log a Call, Text, or Video.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stats;