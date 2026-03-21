import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="flex flex-col animate-pulse">
    <div className="aspect-[4/3] rounded-2xl bg-slate-200 mb-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-shimmer" />
    </div>
    <div className="px-1 space-y-2">
      <div className="h-5 bg-slate-200 rounded-full w-3/4" />
      <div className="h-4 bg-slate-200 rounded-full w-1/2" />
      <div className="h-3 bg-slate-100 rounded-full w-full mt-2" />
      <div className="h-3 bg-slate-100 rounded-full w-5/6" />
    </div>
  </div>
);
