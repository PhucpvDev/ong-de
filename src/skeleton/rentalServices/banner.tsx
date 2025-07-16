import { Skeleton } from "antd";
import React from "react";

export default function SkeletonBanner() {
    return (
        <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
            <div className="absolute inset-0 animate-pulse" />

            <div className="absolute inset-0 pointer-events-none z-[2]">
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-900/50 to-transparent" />
            </div>

            <div className="relative h-full flex items-center justify-center z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="grid lg:grid-cols-12 gap-8 items-center h-full">
                        <div className="lg:col-span-12 col-start-2 space-y-4 text-center lg:text-left">
                            <Skeleton.Button
                                active
                                size="large"
                                className="inline-block rounded-full !w-56 h-9"
                            />

                            <Skeleton
                                active
                                title={{ width: "80%", className: "mx-auto lg:mx-0 !h-15 rounded-lg" }}
                                paragraph={false}
                            />

                            <Skeleton
                                active
                                title={{ width: "100%", className: "mx-auto lg:mx-0 !h-20 rounded-lg" }}
                                paragraph={false}
                            />

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <Skeleton.Button
                                        key={idx}
                                        active
                                        size="large"
                                        className="!w-full h-10 rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 shadow-lg z-20 flex items-center justify-center transition-all">
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 shadow-lg z-20 flex items-center justify-center transition-all">
            </div>
        </div>
    );
}