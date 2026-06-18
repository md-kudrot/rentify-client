import React from 'react';

export default function TrendingDestinations() {
  const destinations = ["Dubai", "London", "Singapore", "New York", "Zurich", "Hong Kong", "Miami"];

  return (
    <section className="py-20 max-w-[1280px] mx-auto px-6">
      <h3 className="text-[32px] font-semibold leading-[1.3] text-white mb-10 text-center">Trending Destinations</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {destinations.map((city, idx) => (
          <div 
            key={idx} 
            className="px-6 py-2 bg-[#3c332d] rounded-full text-[#d9c2b3] hover:text-[#ffb77e] hover:bg-[#261e19] transition-all cursor-pointer border border-[#534438]/10 text-[14px] font-medium"
          >
            {city}
          </div>
        ))}
      </div>
    </section>
  );
}
