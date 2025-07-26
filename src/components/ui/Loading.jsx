import React from "react"

const Loading = () => {
  return (
    <div className="animate-pulse">
      <div className="space-y-6">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 w-3/4"></div>
              <div className="space-y-3">
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading