import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No data available", 
  description = "There's nothing to show here yet.", 
  action,
  actionLabel = "Get Started",
  icon = "Inbox"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-6 mb-6">
        <ApperIcon name={icon} className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md">{description}</p>
      {action && (
        <button
          onClick={action}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-secondary-500 text-white font-medium rounded-lg hover:from-accent hover:to-secondary-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default Empty