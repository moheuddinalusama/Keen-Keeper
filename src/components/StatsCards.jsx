import React from 'react';

const StatsCards = ({ statsData }) => {
  // ডাটা যাতে ক্রাশ না করে সেজন্য ডিফল্ট ভ্যালু সেট করা হয়েছে
  const cards = [
    {
      id: 1,
      label: 'Total Friends',
      value: statsData?.total || 0,
    },
    {
      id: 2,
      label: 'On Track',
      value: statsData?.onTrack || 0,
    },
    {
      id: 3,
      label: 'Need Attention',
      value: statsData?.needAttention || 0,
    },
    {
      id: 4,
      label: 'Interactions',
      value: statsData?.interactions || 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md hover:border-emerald-100 group"
          >
            {/* বড় বোল্ড ভ্যালু */}
            <h3 className="text-5xl font-black text-[#1a2e2a] mb-2 group-hover:scale-110 transition-transform">
              {card.value}
            </h3>
            
            {/* ছোট লেবেল */}
            <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider text-center">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;