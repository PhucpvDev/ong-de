import React, { useState, useEffect } from 'react';

export default function SkeletonTourExperience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-white animate-pulse">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="h-8 w-2/5 bg-gray-50 rounded-lg"></div>
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="rounded-xl overflow-hidden relative h-[50px]">
              <div className="absolute inset-0 bg-gray-50 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-3 flex flex-col justify-center">
                <div className="h-4 w-3/5 bg-gray-50 rounded mb-2"></div>
                <div className="h-3 w-4/5 bg-gray-50 rounded"></div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4 pb-6">
            <div className="h-12 w-full max-w-[384px] bg-gray-50 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-50/90 rounded-full shadow-md absolute top-1/2 left-[-23px] transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gray-50 rounded-full"></div>
          </div>
          <div className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-50/90 rounded-full shadow-md absolute top-1/2 right-[-23px] transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gray-50 rounded-full"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 -mx-2">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="px-2">
                <div className="rounded-xl overflow-hidden relative h-[320px]">
                  <div className="absolute inset-0 bg-gray-50 rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div>
                      <div className="h-6 w-3/5 bg-gray-50 rounded mb-2"></div>
                      <div className="h-4 w-4/5 bg-gray-50 rounded mb-1"></div>
                      <div className="h-4 w-3/4 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}