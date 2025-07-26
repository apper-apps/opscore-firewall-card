import mockQuestions from '@/services/mockData/questions.json';

class QuestionService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'question';
  }

  async getAll() {
try {
      const params = {
fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } },
          { "field": { "Name": "category" } },
          { "field": { "Name": "text" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "weight" } },
          { "field": { "Name": "CreatedOn" } },
          { "field": { "Name": "CreatedBy" } },
          { "field": { "Name": "ModifiedOn" } },
          { "field": { "Name": "ModifiedBy" } }
        ],
        orderBy: [
{
            "fieldName": "order",
            "sorttype": "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Database fetch failed, using mock data:", response.message);
        return mockQuestions;
      }

      // If database returns empty results, fall back to mock data
      if (!response.data || response.data.length === 0) {
        console.log("No questions found in database, using mock data");
        return mockQuestions;
      }

      console.log("Successfully loaded questions from database");
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching questions from database, using mock data:", error?.response?.data?.message);
      } else {
        console.error("Error fetching questions from database, using mock data:", error.message);
      }
      // Return mock data as fallback
      return mockQuestions;
    }
  }

  async getById(id) {
    try {
const params = {
        fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } },
          { "field": { "Name": "category" } },
          { "field": { "Name": "text" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "weight" } },
          { "field": { "Name": "CreatedOn" } },
          { "field": { "Name": "CreatedBy" } },
          { "field": { "Name": "ModifiedOn" } },
          { "field": { "Name": "ModifiedBy" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching question with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async getByCategory(category) {
    try {
      const params = {
fields: [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" } },
          { "field": { "Name": "category" } },
          { "field": { "Name": "text" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "weight" } },
          { "field": { "Name": "CreatedOn" } },
          { "field": { "Name": "CreatedBy" } },
          { "field": { "Name": "ModifiedOn" } },
          { "field": { "Name": "ModifiedBy" } }
        ],
where: [
          {
            "FieldName": "category",
            "Operator": "EqualTo",
            "Values": [category]
          }
        ],
orderBy: [
          {
            "fieldName": "order",
            "sorttype": "ASC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching questions by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
}

export const questionService = new QuestionService()