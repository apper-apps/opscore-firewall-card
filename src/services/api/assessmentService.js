import assessmentsData from "@/services/mockData/assessments.json"

class AssessmentService {
  constructor() {
    this.assessments = [...assessmentsData]
  }

  async getAll() {
    await this.delay(400)
    return [...this.assessments]
  }

  async getById(id) {
    await this.delay(300)
    return this.assessments.find(a => a.Id === parseInt(id))
  }

  async create(assessment) {
    await this.delay(500)
    const newAssessment = {
      ...assessment,
      Id: this.getNextId()
    }
    this.assessments.push(newAssessment)
    return { ...newAssessment }
  }

  async update(id, data) {
    await this.delay(400)
    const index = this.assessments.findIndex(a => a.Id === parseInt(id))
    if (index !== -1) {
      this.assessments[index] = { ...this.assessments[index], ...data }
      return { ...this.assessments[index] }
    }
    return null
  }

  async delete(id) {
    await this.delay(300)
    const index = this.assessments.findIndex(a => a.Id === parseInt(id))
    if (index !== -1) {
      return this.assessments.splice(index, 1)[0]
    }
    return null
  }

  getNextId() {
    return this.assessments.length > 0 
      ? Math.max(...this.assessments.map(a => a.Id)) + 1 
      : 1
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const assessmentService = new AssessmentService()