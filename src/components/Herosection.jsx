import React from 'react';
import { Plus } from 'lucide-react';
const Herosection = () => {
    return (
        <section className="bg-[#f8fafc] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a2e2a] leading-tight tracking-tight">
          Friends to keep close in your life
        </h2>
        <p className="text-[#64748b] text-base md:text-lg max-w-xl leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="flex items-center gap-2.5 px-6 py-3.5 bg-[#2d524a] text-white rounded-md font-semibold text-lg hover:bg-[#1e3932] transition-colors shadow-lg active:scale-95">
          <Plus size={22} strokeWidth={2.5} />
          <span>Add a Friend</span>
        </button>
        
      </div>
    </section>
    );
};

export default Herosection;