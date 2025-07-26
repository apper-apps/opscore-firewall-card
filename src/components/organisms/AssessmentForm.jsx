import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/RadioGroup"
import ProgressBar from "@/components/molecules/ProgressBar"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

const AssessmentForm = ({ questions, onComplete, initialResponses = {} }) => {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState(initialResponses)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Process Efficiency", "Technology & Systems", "Team Performance"]
  const categoryIcons = ["Cog", "Monitor", "Users"]
  
  const questionsByCategory = categories.map(category => 
    questions.filter(q => q.category === category)
  )

  const totalQuestions = questions.length
  const answeredQuestions = Object.keys(responses).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const currentCategoryQuestions = questionsByCategory[currentCategory] || []
  const currentQuestionData = currentCategoryQuestions[currentQuestion]

  const handleAnswer = (value) => {
    if (!currentQuestionData) return
    
    setResponses(prev => ({
      ...prev,
      [currentQuestionData.Id]: {
        questionId: currentQuestionData.Id,
        value: parseInt(value),
        answeredAt: new Date().toISOString()
      }
    }))
    
    toast.success("Answer saved!", { autoClose: 1500 })
  }

  const nextQuestion = () => {
    if (currentQuestion < currentCategoryQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else if (currentCategory < categories.length - 1) {
      setCurrentCategory(prev => prev + 1)
      setCurrentQuestion(0)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1)
      setCurrentQuestion(questionsByCategory[currentCategory - 1].length - 1)
    }
  }

  const handleSubmit = async () => {
    if (answeredQuestions !== totalQuestions) {
      toast.warning("Please answer all questions before submitting.")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      onComplete(Object.values(responses))
      toast.success("Assessment completed successfully!")
    } catch (error) {
      toast.error("Failed to submit assessment. Please try again.")
      setIsSubmitting(false)
    }
  }

  const isLastQuestion = currentCategory === categories.length - 1 && 
                        currentQuestion === currentCategoryQuestions.length - 1

  const canProceed = currentQuestionData && responses[currentQuestionData.Id]

  if (!currentQuestionData) {
    return (
      <div className="text-center">
        <ApperIcon name="Loader" className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
        <p>Loading questions...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">
              {categories[currentCategory]}
            </h2>
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {currentCategoryQuestions.length} in this category
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">
              Overall Progress: {answeredQuestions} / {totalQuestions}
            </p>
            <ProgressBar progress={progress} className="w-48" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex space-x-4">
          {categories.map((category, index) => (
            <div
              key={category}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                index === currentCategory
                  ? "bg-gradient-to-r from-accent to-secondary-500 text-white shadow-lg"
                  : index < currentCategory
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <ApperIcon name={categoryIcons[index]} className="w-4 h-4 mr-2" />
              {category}
              {index < currentCategory && (
                <ApperIcon name="Check" className="w-4 h-4 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentCategory}-${currentQuestion}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-700 to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name={categoryIcons[currentCategory]} className="w-6 h-6 text-white" />
                </div>
                <span>{currentQuestionData.text}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup className="space-y-3">
                {[
                  { value: 1, label: "Poor", description: "Significant issues, needs immediate attention" },
                  { value: 2, label: "Fair", description: "Below average, room for improvement" },
                  { value: 3, label: "Good", description: "Adequate performance, meeting basic requirements" },
                  { value: 4, label: "Very Good", description: "Above average, performing well" },
                  { value: 5, label: "Excellent", description: "Outstanding performance, best in class" }
                ].map((option) => (
                  <RadioGroupItem
                    key={option.value}
                    value={option.value}
                    checked={responses[currentQuestionData.Id]?.value === option.value}
                    onChange={() => handleAnswer(option.value)}
                    className="p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                    </div>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentCategory === 0 && currentQuestion === 0}
          className="flex items-center"
        >
          <ApperIcon name="ChevronLeft" className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {answeredQuestions} of {totalQuestions} questions answered
          </p>
        </div>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed || isSubmitting}
            className="flex items-center"
          >
            {isSubmitting ? (
              <>
                <ApperIcon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Complete Assessment
                <ApperIcon name="Check" className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={nextQuestion}
            disabled={!canProceed}
            className="flex items-center"
          >
            Next
            <ApperIcon name="ChevronRight" className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default AssessmentForm