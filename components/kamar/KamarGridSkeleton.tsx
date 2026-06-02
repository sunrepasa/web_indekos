import React from 'react';

export function KamarGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="card rounded-3xl p-5"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl" style={{ background: "var(--bg-muted)" }} />
              <div>
                <div className="w-14 h-5 rounded-md mb-2" style={{ background: "var(--bg-muted)" }} />
                <div className="w-20 h-3 rounded-md" style={{ background: "var(--bg-muted)" }} />
              </div>
            </div>
            <div className="w-20 h-6 rounded-full" style={{ background: "var(--bg-muted)" }} />
          </div>

          {/* Details */}
          <div className="space-y-2.5 mb-5">
            <div className="w-full h-4 rounded-md" style={{ background: "var(--bg-muted)" }} />
            <div className="w-3/4 h-4 rounded-md" style={{ background: "var(--bg-muted)" }} />
            <div className="w-1/2 h-4 rounded-md mt-4" style={{ background: "var(--bg-muted)" }} />
          </div>

          {/* Action */}
          <div className="w-full h-10 rounded-xl" style={{ background: "var(--bg-muted)" }} />
        </div>
      ))}
    </div>
  );
}
