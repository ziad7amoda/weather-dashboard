import React from 'react';

const WeatherCardSkeleton: React.FC = () => {
  return (
    <div className="weather-card bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl shadow-xl p-6 animate-pulse">
      {/* Location Header Skeleton */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-1">
          <div className="w-4 h-4 bg-white/30 rounded-full mr-1.5"></div>
          <div className="w-24 h-4 bg-white/30 rounded"></div>
        </div>
        <div className="w-32 h-3 bg-white/30 rounded mx-auto"></div>
      </div>

      {/* Temperature Skeleton */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="w-20 h-12 bg-white/30 rounded"></div>
        </div>
        <div className="flex items-center justify-center mb-3">
          <div className="w-8 h-8 bg-white/30 rounded-full mr-2"></div>
          <div className="w-24 h-3 bg-white/30 rounded"></div>
        </div>
      </div>

      {/* High/Low Skeleton */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center space-x-6">
          <div className="text-center">
            <div className="w-8 h-2 bg-white/30 rounded mb-1"></div>
            <div className="w-6 h-4 bg-white/30 rounded"></div>
          </div>
          <div className="w-px h-6 bg-white/30"></div>
          <div className="text-center">
            <div className="w-8 h-2 bg-white/30 rounded mb-1"></div>
            <div className="w-6 h-4 bg-white/30 rounded"></div>
          </div>
        </div>
      </div>

      {/* Weather Details Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
            <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            <div className="flex-1">
              <div className="w-12 h-2 bg-white/30 rounded mb-1"></div>
              <div className="w-8 h-3 bg-white/30 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Last Updated Skeleton */}
      <div className="mt-4 pt-3 border-t border-white/20">
        <div className="w-32 h-2 bg-white/30 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default WeatherCardSkeleton; 