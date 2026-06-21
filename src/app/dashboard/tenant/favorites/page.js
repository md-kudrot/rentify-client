"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Icon from "@/components/Icon";

export default function FavoritesPage() {
  const initialFavorites = [
    {
      id: "FAV-001",
      property: "Luxury Villa in Beverly Hills",
      location: "Beverly Hills, CA",
      price: "$4,500/mo",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FAV-002",
      property: "Modern Downtown Apartment",
      location: "New York, NY",
      price: "$2,100/mo",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FAV-003",
      property: "Seaside Cottage",
      location: "Malibu, CA",
      price: "$1,800/mo",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemove = (id) => {
    // Optimistic UI update
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    // Simulate DELETE API call
    console.log(`DELETE API call to /api/favorites/${id}`);
  };

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-lg">
        <div>
          <h2 className="font-display-sm text-on-surface">Favorites</h2>
          <p className="text-on-surface-variant text-sm mt-1">Properties you have saved for later.</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 rounded-xxl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                  <th className="p-md font-bold text-on-surface-variant text-sm">Property</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm">Location</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm">Price</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm">Rating</th>
                  <th className="p-md font-bold text-on-surface-variant text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {favorites.map((fav) => (
                  <tr key={fav.id} className="hover:bg-surface-container-highest/20 transition-colors">
                    <td className="p-md">
                      <div className="flex items-center gap-md">
                        <div className="w-16 h-12 rounded-lg bg-surface-container-highest flex-shrink-0 overflow-hidden relative">
                          <img src={fav.image} alt={fav.property} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{fav.property}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-md text-sm text-on-surface-variant flex items-center gap-1">
                      <Icon name="location_on" size={16} />
                      {fav.location}
                    </td>
                    <td className="p-md text-sm font-bold text-primary">{fav.price}</td>
                    <td className="p-md text-sm text-on-surface flex items-center gap-1">
                      <Icon name="star" size={16} className="text-yellow-500" />
                      {fav.rating}
                    </td>
                    <td className="p-md text-right">
                      <button 
                        onClick={() => handleRemove(fav.id)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ml-auto"
                      >
                        <Icon name="delete" size={16} />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {favorites.length === 0 && (
            <div className="p-xl text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-md">
                <Icon name="favorite_border" size={32} className="text-on-surface-variant" />
              </div>
              <h3 className="text-on-surface font-bold text-lg">No Favorites Yet</h3>
              <p className="text-on-surface-variant text-sm mt-1">Start browsing properties and add them to your favorites.</p>
              <button className="mt-md px-6 py-2 bg-primary text-on-primary-container rounded-xl font-bold hover:bg-primary-hover transition-colors">
                Browse Properties
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
