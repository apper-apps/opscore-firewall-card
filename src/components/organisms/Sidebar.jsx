import React from "react"
import NavigationItem from "@/components/molecules/NavigationItem"
import ApperIcon from "@/components/ApperIcon"

const Sidebar = ({ className = "" }) => {
  const navigationItems = [
    { to: "/", icon: "Home", label: "Welcome" },
    { to: "/assessment", icon: "ClipboardList", label: "Assessment" },
    { to: "/results", icon: "BarChart3", label: "Results" },
    { to: "/dashboard", icon: "Dashboard", label: "Dashboard" },
  ]

  return (
    <div className={`bg-white border-r border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Target" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">OpScore Pro</h1>
            <p className="text-sm text-gray-600">Operations Assessment</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-br from-surface to-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Need Help?</p>
              <p className="text-xs text-gray-600">Assessment Guide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar