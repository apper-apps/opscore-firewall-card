import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ScoreCard from "@/components/molecules/ScoreCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { assessmentService } from "@/services/api/assessmentService"
import { questionService } from "@/services/api/questionService"

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    calculateResults()
  }, [location.state])

  const calculateResults = async () => {
try {
      setError("")
      setLoading(true)
      
      const assessmentId = location.state?.assessmentId
      if (!assessmentId) {
        setError("No assessment data found. Please complete an assessment first.")
        return
      }
      
      const assessment = await assessmentService.getById(assessmentId)
      const questions = await questionService.getAll()
      
      if (!assessment || !assessment.responses) {
        setError("Assessment data not found.")
        return
      }

      // Parse responses from database (stored as JSON string)
      let parsedResponses = assessment.responses
      if (typeof assessment.responses === 'string') {
        try {
          parsedResponses = JSON.parse(assessment.responses)
        } catch (parseError) {
          console.error("Error parsing responses:", parseError)
          setError("Assessment data format error.")
          return
        }
      }

      // Calculate scores by category
      const categoryScores = {}
      const categories = ["Process Efficiency", "Technology & Systems", "Team Performance"]
      
      categories.forEach(category => {
        const categoryQuestions = questions.filter(q => q.category === category)
        const categoryResponses = parsedResponses.filter(r => 
          categoryQuestions.some(q => q.Id === r.questionId)
        )
        
        const totalScore = categoryResponses.reduce((sum, response) => sum + response.value, 0)
        const maxScore = categoryQuestions.length * 5
        categoryScores[category] = {
          score: totalScore,
          maxScore: maxScore,
          percentage: Math.round((totalScore / maxScore) * 100)
        }
      })

      // Calculate overall score
      const totalScore = Object.values(categoryScores).reduce((sum, cat) => sum + cat.score, 0)
      const totalMaxScore = Object.values(categoryScores).reduce((sum, cat) => sum + cat.maxScore, 0)
      const overallPercentage = Math.round((totalScore / totalMaxScore) * 100)

      // Determine performance level
      const getPerformanceLevel = (percentage) => {
        if (percentage >= 90) return { level: "Excellent", color: "text-green-600" }
        if (percentage >= 80) return { level: "Very Good", color: "text-green-500" }
        if (percentage >= 70) return { level: "Good", color: "text-yellow-600" }
        if (percentage >= 60) return { level: "Fair", color: "text-yellow-500" }
        return { level: "Needs Improvement", color: "text-red-600" }
      }

      const performance = getPerformanceLevel(overallPercentage)

      setResults({
        overallScore: totalScore,
        overallMaxScore: totalMaxScore,
        overallPercentage,
        categoryScores,
        performanceLevel: performance.level,
        performanceColor: performance.color,
        completedAt: assessment.completedAt
      })

    } catch (err) {
      setError("Failed to calculate results. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getRecommendations = (categoryScores) => {
    const recommendations = []
    
    Object.entries(categoryScores).forEach(([category, data]) => {
      if (data.percentage < 70) {
        let recommendation = ""
        switch (category) {
          case "Process Efficiency":
            recommendation = "Focus on streamlining workflows, implementing standard operating procedures, and identifying automation opportunities."
            break
          case "Technology & Systems":
            recommendation = "Invest in upgrading technology infrastructure, improving system integration, and adopting digital tools for better efficiency."
            break
          case "Team Performance":
            recommendation = "Enhance team communication, provide skills training, and implement performance management systems."
            break
          default:
            recommendation = "Review and improve processes in this area."
        }
        recommendations.push({ category, recommendation, score: data.percentage })
      }
    })
    
    return recommendations.sort((a, b) => a.score - b.score)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={() => navigate("/assessment")} />
  if (!results) return <Error message="No results available" onRetry={() => navigate("/assessment")} />

  const recommendations = getRecommendations(results.categoryScores)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Trophy" className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
          Assessment Results
        </h1>
        <p className="text-gray-600">
          Completed on {new Date(results.completedAt).toLocaleDateString()}
        </p>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-primary-50 to-accent/10 border-primary-200 shadow-lg">
          <CardContent className="py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-8">
                <div>
                  <h2 className="font-display text-6xl font-bold bg-gradient-to-r from-primary-700 to-accent bg-clip-text text-transparent mb-2">
                    {results.overallPercentage}%
                  </h2>
                  <p className="text-gray-600 text-lg">Overall Score</p>
                  <p className={`font-semibold text-xl ${results.performanceColor}`}>
                    {results.performanceLevel}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-600 mb-1">Total Points</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {results.overallScore} / {results.overallMaxScore}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Category Breakdown</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(results.categoryScores).map(([category, data], index) => {
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

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <ApperIcon name="Lightbulb" className="w-6 h-6 text-yellow-500" />
                <span>Improvement Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={rec.category} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <ApperIcon name="AlertTriangle" className="w-4 h-4 text-yellow-600 mr-2" />
                      {rec.category} ({rec.score}%)
                    </h4>
                    <p className="text-gray-700">{rec.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          onClick={() => navigate("/assessment")}
          variant="outline"
          className="flex items-center"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Take Another Assessment
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          className="flex items-center"
        >
          <ApperIcon name="Dashboard" className="w-4 h-4 mr-2" />
          View Dashboard
        </Button>
      </motion.div>
    </div>
  )
}

export default Results