import React from 'react';

const StatsCards = ({ statsData }) => {
  const cards = [
    {
      id: 1,
      label: 'Total Friends',
      value: statsData?.total || 10,
    },
    {
      id: 2,
      label: 'On Track',
      value: statsData?.onTrack || 3,
    },
    {
      id: 3,
      label: 'Need Attention',
      value: statsData?.needAttention || 6,
    },
    {
      id: 4,
      label: 'Interactions This Month',
      value: statsData?.interactions || 12,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-10 rounded-xl border border-gray-300 shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md"
          >
            
            <h3 className="text-4xl font-bold text-[#1a2e2a] mb-2">
              {card.value}
            </h3>
            <p className="text-[#64748b] font-medium text-center">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;