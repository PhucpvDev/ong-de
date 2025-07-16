import React from 'react';

export default function SkeletonBanner() {
  return (
    <div className="relative w-full h-[100vh] min-h-[600px] md:pt-14 overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gray-100/20"></div>

      <div className="relative h-full flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-7 space-y-6">
              <div className="h-12 w-4/5 bg-gray-100 rounded-lg"></div>
              <div className="h-8 w-3/5 bg-gray-100 rounded-lg hidden md:block"></div>
              <div className="max-w-2xl bg-gray-200 p-4 rounded-lg border border-white/20 backdrop-blur-sm space-y-2">
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-100 rounded"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 hidden md:grid">
                {Array(4).fill(0).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
                  >
                    <div className="h-5 w-4/5 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="space-y-6 w-full max-w-sm">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <div className="h-6 w-1/2 bg-gray-100 rounded mx-auto mb-4"></div>
                  <div className="space-y-4">
                    {Array(4).fill(0).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/5 bg-gray-100 rounded"></div>
                          <div className="h-3 w-4/5 bg-gray-100 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}