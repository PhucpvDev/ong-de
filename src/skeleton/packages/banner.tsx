import React from 'react';

export default function SkeletonBannerCombo() {
  return (
    <div className="relative font-roboto">
      <div className="relative h-[550px] md:h-[600px] overflow-hidden animate-pulse">
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full border-4 transform -translate-x-1/2 translate-y-1/2 border-yellow-400/50 md:block hidden"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 mt-10 h-full flex items-center justify-center md:justify-start">
          <div className="max-w-lg text-center md:text-left md:mt-0 mt-10 space-y-4">
            <div className="h-10 w-4/5 bg-gray-100 rounded-lg mx-auto md:mx-0"></div>
            <div className="h-6 w-3/5 bg-gray-100 rounded-lg mx-auto md:mx-0"></div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              {Array(2).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-10 py-2.5 rounded-full bg-white/20 backdrop-blur-lg border border-dashed border-orange-400/30"
                >
                  <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}