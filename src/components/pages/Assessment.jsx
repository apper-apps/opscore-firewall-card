import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AssessmentForm from "@/components/organisms/AssessmentForm"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { assessmentService } from "@/services/api/assessmentService"
import { questionService } from "@/services/api/questionService"

const Assessment = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    try {
      setError("")
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      const data = await questionService.getAll()
      setQuestions(data)
    } catch (err) {
      setError("Failed to load questions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async (responses) => {
    try {
      const assessment = {
        Id: Date.now(),
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        responses: responses,
        status: "completed"
      }

      await assessmentService.create(assessment)
      navigate("/results", { state: { assessmentId: assessment.Id } })
    } catch (err) {
      console.error("Failed to save assessment:", err)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadQuestions} />

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
          Operations Assessment
        </h1>
        <p className="text-gray-600 text-lg">
          Answer all questions honestly to get the most accurate assessment of your operations.
        </p>
      </div>

      <AssessmentForm
        questions={questions}
        onComplete={handleComplete}
      />
    </div>
  )
}

export default Assessment