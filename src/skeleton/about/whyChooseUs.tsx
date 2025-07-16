import React from 'react';

export default function SkeletonWhyChooseUsWithTabs() {
  return (
    <section className="py-16 bg-white animate-pulse">
      <div className="container mx-auto px-4 lg:px-12 xl:px-20 2xl:px-36">
        <div className="mb-12">
          <div className="h-10 w-2/5 bg-gray-200 rounded-lg mb-4"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-3">
            {Array(3).fill(0).map((_, index) => (
              <div
                key={index}
                className={`relative rounded-xl border bg-white border-gray-200 p-4 transition-all duration-200 ${
                  index === 0 ? "shadow-lg" : "hover:shadow-md"
                }`}
              >
                {index === 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-green-600"></div>
                )}
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${index === 0 ? "bg-green-500" : "bg-gray-100"}`}>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-5 w-3/5 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                    {index === 0 && (
                      <div className="space-y-2 mt-3">
                        {Array(3).fill(0).map((_, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-green-600"></div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl p-4 border bg-white border-gray-200 shadow-xs">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg mb-3 shadow-md bg-green-50">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4 bg-gray-50">
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2">
                    {Array(3).fill(0).map((_, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="h-4 w-2/5 bg-gray-200 rounded"></div>
                          <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden bg-gray-200">
                          <div
                            className="h-full rounded-full bg-gray-300"
                            style={{ width: `${Math.random() * 50 + 30}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl p-4 bg-gray-50 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="h-4 w-2/5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-4 w-3/5 bg-gray-200 rounded mx-auto mt-4"></div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg mt-3 shadow-md bg-green-50">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center p-4 rounded-xl border bg-gray-50 border-gray-200">
                <div className="h-5 w-1/2 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}