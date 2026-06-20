"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RevenueChart({ data, title = "Revenue Forecast", subtitle = "Monthly earnings with growth projection", colorTheme = "copper" }) {
  // Define themes
  const themes = {
    copper: {
      stroke: "#F4A261",
      fillStart: "#C97B36",
      fillEnd: "#C97B36"
    },
    blue: {
      stroke: "#64d6eb",
      fillStart: "#139fb3",
      fillEnd: "#139fb3"
    },
    gold: {
      stroke: "#ffb77e",
      fillStart: "#cd7e39",
      fillEnd: "#cd7e39"
    }
  };

  const theme = themes[colorTheme] || themes.copper;

  return (
    <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-[24px] border border-slate-50/5 p-lg rounded-xxl space-y-lg h-[400px] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-headline-md text-on-surface">{title}</h4>
          <p className="text-on-surface-variant text-sm">{subtitle}</p>
        </div>
        <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant/10">
          <button className="px-4 py-1.5 rounded-md bg-primary-container text-on-primary-container text-xs font-bold">12M</button>
          <button className="px-4 py-1.5 rounded-md text-on-surface-variant text-xs hover:text-primary transition-colors">6M</button>
          <button className="px-4 py-1.5 rounded-md text-on-surface-variant text-xs hover:text-primary transition-colors">3M</button>
        </div>
      </div>
      
      <div className="flex-1 w-full relative pt-md min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`colorGradient-${colorTheme}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.fillStart} stopOpacity={0.3} />
                <stop offset="95%" stopColor={theme.fillEnd} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 10 }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={theme.stroke} 
              strokeWidth={3}
              fillOpacity={1} 
              fill={`url(#colorGradient-${colorTheme})`} 
              activeDot={{ r: 6, fill: theme.stroke, stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
