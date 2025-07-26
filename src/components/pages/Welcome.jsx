import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Welcome = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: "Target",
      title: "Comprehensive Analysis",
      description: "Evaluate three key areas: Process Efficiency, Technology & Systems, and Team Performance"
    },
    {
      icon: "Clock",
      title: "Quick Assessment",
      description: "Complete evaluation in just 10-15 minutes with our streamlined questionnaire"
    },
    {
      icon: "BarChart3",
      title: "Instant Results",
      description: "Get immediate insights with detailed scoring and actionable recommendations"
    },
    {
      icon: "TrendingUp",
      title: "Track Progress",
      description: "Monitor improvements over time with our comprehensive dashboard"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <ApperIcon name="Target" className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-700 to-accent bg-clip-text text-transparent">
          Welcome to OpScore Pro
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Your comprehensive operations assessment tool designed to evaluate and improve 
          operational efficiency across your organization. Get actionable insights in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => navigate("/assessment")}
            className="flex items-center"
          >
            <ApperIcon name="Play" className="w-5 h-5 mr-2" />
            Start Assessment
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="flex items-center"
          >
            <ApperIcon name="Dashboard" className="w-5 h-5 mr-2" />
            View Dashboard
          </Button>
        </div>
      </motion.div>

      {/* Assessment Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <Card className="bg-gradient-to-br from-primary-50 to-accent/10 border-primary-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-3">
              <ApperIcon name="ClipboardList" className="w-8 h-8 text-primary-700" />
              <span>How It Works</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-700 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Answer Questions</h3>
                <p className="text-gray-600 text-sm">Complete 15 targeted questions across three operational categories</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Scored</h3>
                <p className="text-gray-600 text-sm">Receive instant scoring and performance analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Take Action</h3>
                <p className="text-gray-600 text-sm">Implement recommendations to improve operations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-8">
          Why Choose OpScore Pro?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary-500 rounded-lg flex items-center justify-center mb-4">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Assessment Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-8">
          Assessment Categories
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "Cog",
              title: "Process Efficiency",
              description: "Evaluate workflow optimization, standard operating procedures, and process automation",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: "Monitor",
              title: "Technology & Systems",
              description: "Assess technology infrastructure, digital tools, and system integration capabilities",
              color: "from-purple-500 to-purple-600"
            },
            {
              icon: "Users",
              title: "Team Performance",
              description: "Analyze team productivity, communication effectiveness, and collaboration quality",
              color: "from-green-500 to-green-600"
            }
          ].map((category, index) => (
            <Card key={category.title} className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <ApperIcon name={category.icon} className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-br from-primary-700 to-accent text-white border-0 shadow-xl">
          <CardContent className="py-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to Assess Your Operations?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Take the first step towards operational excellence. Our assessment takes just 15 minutes 
              and provides immediate, actionable insights.
            </p>
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate("/assessment")}
              className="bg-white text-primary-700 hover:bg-gray-100 shadow-lg"
            >
              <ApperIcon name="ArrowRight" className="w-5 h-5 mr-2" />
              Begin Assessment Now
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Welcome