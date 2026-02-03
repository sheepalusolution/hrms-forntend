// src/component/SkeletonLoader.jsx
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex-1 flex flex-col p-4 space-y-4">
      {/* Header Skeleton */}
      <div className="h-8 w-1/3 bg-gray-300 rounded-md animate-pulse"></div>

      {/* Main content skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-full bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-6 w-full bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-6 w-5/6 bg-gray-300 rounded-md animate-pulse"></div>
      </div>

      {/* Footer / button skeleton */}
      <div className="h-10 w-1/4 bg-gray-300 rounded-md animate-pulse mt-4"></div>
    </div>
  );
};

export default SkeletonLoader;
