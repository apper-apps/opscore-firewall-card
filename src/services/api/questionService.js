import questionsData from "@/services/mockData/questions.json"

class QuestionService {
  constructor() {
    this.questions = [...questionsData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.questions]
  }

  async getById(id) {
    await this.delay(200)
    return this.questions.find(q => q.Id === parseInt(id))
  }

  async getByCategory(category) {
    await this.delay(250)
    return this.questions.filter(q => q.category === category)
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const questionService = new QuestionService()