import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ScoreCard from "@/components/molecules/ScoreCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { assessmentService } from "@/services/api/assessmentService"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadAssessments()
  }, [])

  const loadAssessments = async () => {
    try {
      setError("")
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      const data = await assessmentService.getAll()
      setAssessments(data.filter(a => a.status === "completed"))
    } catch (err) {
      setError("Failed to load assessments. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const calculateAverageScores = () => {
    if (assessments.length === 0) return null

    const categories = ["Process Efficiency", "Technology & Systems", "Team Performance"]
    const categoryTotals = {}
    const categoryCount = {}

    categories.forEach(category => {
      categoryTotals[category] = 0
      categoryCount[category] = 0
    })

    assessments.forEach(assessment => {
      if (assessment.responses) {
        assessment.responses.forEach(response => {
          const category = getCategoryForResponse(response.questionId)
          if (category) {
            categoryTotals[category] += response.value
            categoryCount[category] += 1
          }
        })
      }
    })

    const averageScores = {}
    categories.forEach(category => {
      if (categoryCount[category] > 0) {
        const avgScore = categoryTotals[category] / categoryCount[category]
        averageScores[category] = {
          score: Math.round(avgScore * 20), // Convert to percentage
          maxScore: 100
        }
      }
    })

    return averageScores
  }

  const getCategoryForResponse = (questionId) => {
    // Simple mapping based on question ID ranges
    if (questionId >= 1 && questionId <= 5) return "Process Efficiency"
    if (questionId >= 6 && questionId <= 10) return "Technology & Systems"
    if (questionId >= 11 && questionId <= 15) return "Team Performance"
    return null
  }

  const getLatestAssessment = () => {
    if (assessments.length === 0) return null
    return assessments.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0]
  }

  const getTrendData = () => {
    const last5 = assessments
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, 5)
      .reverse()

    return last5.map(assessment => {
      const totalScore = assessment.responses?.reduce((sum, r) => sum + r.value, 0) || 0
      const maxScore = (assessment.responses?.length || 0) * 5
      return {
        date: new Date(assessment.completedAt).toLocaleDateString(),
        score: Math.round((totalScore / maxScore) * 100)
      }
    })
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadAssessments} />
  
  if (assessments.length === 0) {
    return (
      <Empty
        title="No Assessments Yet"
        description="Start your operational excellence journey by taking your first assessment."
        action={() => navigate("/assessment")}
        actionLabel="Take Assessment"
        icon="ClipboardList"
      />
    )
  }

  const averageScores = calculateAverageScores()
  const latestAssessment = getLatestAssessment()
  const trendData = getTrendData()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
              Operations Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Track your operational performance and improvement over time
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button
              onClick={() => navigate("/assessment")}
              className="flex items-center"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Assessments</p>
                <p className="text-3xl font-bold text-blue-900">{assessments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="ClipboardList" className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Latest Score</p>
                <p className="text-3xl font-bold text-green-900">
                  {latestAssessment ? Math.round((latestAssessment.responses?.reduce((sum, r) => sum + r.value, 0) / (latestAssessment.responses?.length * 5)) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Last Assessment</p>
                <p className="text-lg font-bold text-purple-900">
                  {latestAssessment ? new Date(latestAssessment.completedAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Average Category Scores */}
      {averageScores && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Average Performance by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(averageScores).map(([category, data], index) => {
              const icons = { "Process Efficiency": "Cog", "Technology & Systems": "Monitor", "Team Performance": "Users" }
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <ScoreCard
                    title={category}
                    score={data.score}
                    maxScore={data.maxScore}
                    icon={icons[category]}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Recent Assessments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-8"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <ApperIcon name="History" className="w-6 h-6 text-gray-600" />
              <span>Recent Assessments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments
                .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
                .slice(0, 5)
                .map((assessment, index) => {
                  const totalScore = assessment.responses?.reduce((sum, r) => sum + r.value, 0) || 0
                  const maxScore = (assessment.responses?.length || 0) * 5
                  const percentage = Math.round((totalScore / maxScore) * 100)
                  
                  return (
                    <div key={assessment.Id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">#{assessments.length - index}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Assessment completed
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(assessment.completedAt).toLocaleDateString()} at {new Date(assessment.completedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
                        <p className="text-sm text-gray-600">{totalScore}/{maxScore} points</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Trend */}
      {trendData.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <ApperIcon name="TrendingUp" className="w-6 h-6 text-green-600" />
                <span>Performance Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendData.map((point, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{point.date}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-accent to-secondary-500 h-2 rounded-full"
                          style={{ width: `${point.score}%` }}
                        />
                      </div>
                      <span className="font-semibold text-gray-900 w-12">{point.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default Dashboard