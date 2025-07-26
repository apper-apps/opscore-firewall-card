import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import NavigationItem from "@/components/molecules/NavigationItem"
import ApperIcon from "@/components/ApperIcon"

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    { to: "/", icon: "Home", label: "Welcome" },
    { to: "/assessment", icon: "ClipboardList", label: "Assessment" },
    { to: "/results", icon: "BarChart3", label: "Results" },
    { to: "/dashboard", icon: "Dashboard", label: "Dashboard" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="Target" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-gray-900">OpScore Pro</h1>
                  <p className="text-sm text-gray-600">Operations Assessment</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <NavigationItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  onClick={onClose}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSidebar