import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const RadioGroup = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))

RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = forwardRef(({ className, value, checked, onChange, children, ...props }, ref) => (
  <label
    className={cn(
      "flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
      checked 
        ? "border-accent bg-gradient-to-r from-accent/10 to-secondary-500/10 shadow-sm" 
        : "border-gray-200 hover:border-gray-300 bg-white",
      className
    )}
  >
    <input
      ref={ref}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-accent border-gray-300 focus:ring-accent focus:ring-2"
      {...props}
    />
    <span className={cn("font-medium", checked ? "text-gray-900" : "text-gray-700")}>
      {children}
    </span>
  </label>
))

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }