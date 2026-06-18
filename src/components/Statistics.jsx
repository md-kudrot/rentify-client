import React from 'react';

export default function Statistics() {
  const stats = [
    { value: "2,500+", label: "Curated Properties" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "15+", label: "Global Cities" },
    { value: "$4.2B", label: "Managed Assets" },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <p className="text-[#ffb77e] text-[32px] md:text-[48px] font-bold leading-[1.2] md:leading-[1.1] tracking-[-0.01em] md:tracking-[-0.02em]">
                {stat.value}
              </p>
              <p className="text-[#d9c2b3] text-[14px] font-medium tracking-[0.05em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
