import React from "react"
import { NavLink } from "react-router-dom"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const NavigationItem = ({ to, icon, label, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-gradient-to-r from-accent/20 to-secondary-500/20 text-primary-700 border-l-4 border-accent shadow-sm"
            : "text-gray-600 hover:text-primary-700 hover:bg-gray-50",
          className
        )
      }
    >
      <ApperIcon 
        name={icon} 
        className="w-5 h-5 mr-3 transition-colors duration-200" 
      />
      {label}
    </NavLink>
  )
}

export default NavigationItem