import React from "react"
import { cn } from "@/utils/cn"

const ProgressBar = ({ progress, className }) => {
  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2", className)}>
      <div 
        className="bg-gradient-to-r from-accent to-secondary-500 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  )
}

export default ProgressBar