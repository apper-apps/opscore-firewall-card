import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const ScoreCard = ({ title, score, maxScore = 100, icon, className }) => {
  const percentage = Math.round((score / maxScore) * 100)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreGradient = (percentage) => {
    if (percentage >= 80) return "from-green-400 to-green-600"
    if (percentage >= 60) return "from-yellow-400 to-yellow-600"
    return "from-red-400 to-red-600"
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          {icon && <ApperIcon name={icon} className="w-6 h-6 text-gray-400" />}
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`stop-color-green-400 ${getScoreGradient(percentage).includes('green') ? 'opacity-100' : 'opacity-0'}`} />
                <stop offset="100%" className={`stop-color-green-600 ${getScoreGradient(percentage).includes('green') ? 'opacity-100' : 'opacity-0'}`} />
                <stop offset="0%" className={`stop-color-yellow-400 ${getScoreGradient(percentage).includes('yellow') ? 'opacity-100' : 'opacity-0'}`} />
                <stop offset="100%" className={`stop-color-yellow-600 ${getScoreGradient(percentage).includes('yellow') ? 'opacity-100' : 'opacity-0'}`} />
                <stop offset="0%" className={`stop-color-red-400 ${getScoreGradient(percentage).includes('red') ? 'opacity-100' : 'opacity-0'}`} />
                <stop offset="100%" className={`stop-color-red-600 ${getScoreGradient(percentage).includes('red') ? 'opacity-100' : 'opacity-0'}`} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
              {percentage}%
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {score}/{maxScore}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ScoreCard