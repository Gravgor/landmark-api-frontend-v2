const DashboardSkeleton = () => (
  <div className="min-h-screen bg-[#0A0B1A] text-white">
    {/* Header Skeleton */}
    <header className="border-b border-blue-500/20 bg-[#0D0E23] py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-6 py-8">
      {/* Welcome Section Skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-8 w-64 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-48 bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#0D0E23] rounded-xl p-6 border border-blue-500/20">
            <div className="animate-pulse space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                <div className="h-6 w-6 bg-gray-700 rounded"></div>
              </div>
              <div className="h-6 w-32 bg-gray-700 rounded"></div>
              <div className="h-2 w-full bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* API Key Section Skeleton */}
      <div className="bg-[#0D0E23] rounded-xl p-6 border border-blue-500/20 mb-8">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-700 rounded"></div>
            <div className="h-5 w-32 bg-gray-700 rounded"></div>
          </div>
          <div className="h-10 w-full bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Activity Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-[#0D0E23] rounded-xl p-6 border border-blue-500/20">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-32 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-20 w-full bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default DashboardSkeleton;