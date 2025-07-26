import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionService } from "@/services/api/questionService";
import { assessmentService } from "@/services/api/assessmentService";
import AssessmentForm from "@/components/organisms/AssessmentForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

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
        Name: `Assessment ${new Date().toLocaleDateString()}`,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        responses: responses,
        status: "completed"
      }

      const savedAssessment = await assessmentService.create(assessment)
      if (savedAssessment) {
        navigate("/results", { state: { assessmentId: savedAssessment.Id } })
      } else {
        console.error("Failed to save assessment")
      }
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