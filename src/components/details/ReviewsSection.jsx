import React from 'react';

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Julian Thorne",
      date: "October 2023",
      comment: "The attention to detail in this villa is incredible. The copper hardware and the midnight lighting setup creates an atmosphere I've never seen before. A truly luxury stay."
    },
    {
      name: "Sarah Sterling",
      date: "December 2023",
      comment: "Elena was a fantastic host. The property exceeded every expectation. That infinity pool at sunset is worth the booking alone."
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[32px] font-semibold leading-[1.3] text-white">4.98 · 124 Reviews</h3>
        <button className="text-[#ffb77e] font-bold">View all</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {reviews.map((rev, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#3f465c]"></div>
              <div>
                <h5 className="font-bold text-white text-[16px]">{rev.name}</h5>
                <p className="text-[#d9c2b3] text-[14px]">{rev.date}</p>
              </div>
            </div>
            <p className="text-[#d9c2b3] text-[16px] italic leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
