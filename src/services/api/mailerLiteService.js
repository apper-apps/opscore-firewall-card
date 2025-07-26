import axios from 'axios';
import { toast } from 'react-toastify';

class MailerLiteService {
  constructor() {
    this.apiKey = import.meta.env.VITE_MAILERLITE_API_KEY;
    this.baseURL = 'https://connect.mailerlite.com/api';
    
    // Create axios instance with default headers
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
  }

  // Subscriber Management
  async addSubscriber(email, fields = {}, groups = []) {
    try {
      const payload = {
        email,
        fields: {
          name: fields.name || '',
          last_name: fields.lastName || '',
          company: fields.company || '',
          ...fields
        },
        groups: groups.map(group => ({ id: group }))
      };

      const response = await this.api.post('/subscribers', payload);
      
      if (response.data) {
        toast.success('Successfully subscribed to newsletter!');
        return {
          success: true,
          data: response.data.data,
          message: 'Subscriber added successfully'
        };
      }
    } catch (error) {
      console.error('Error adding subscriber to MailerLite:', error.response?.data?.message || error.message);
      
      if (error.response?.status === 422) {
        toast.info('Email is already subscribed to our newsletter');
        return {
          success: true,
          message: 'Email already subscribed'
        };
      }
      
      toast.error('Failed to subscribe to newsletter. Please try again.');
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add subscriber'
      };
    }
  }

  async updateSubscriber(subscriberId, fields = {}) {
    try {
      const payload = {
        fields: {
          name: fields.name || '',
          last_name: fields.lastName || '',
          company: fields.company || '',
          ...fields
        }
      };

      const response = await this.api.put(`/subscribers/${subscriberId}`, payload);
      
      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: 'Subscriber updated successfully'
        };
      }
    } catch (error) {
      console.error('Error updating subscriber in MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update subscriber'
      };
    }
  }

  async getSubscriber(email) {
    try {
      const response = await this.api.get(`/subscribers/${email}`);
      
      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: 'Subscriber retrieved successfully'
        };
      }
    } catch (error) {
      console.error('Error getting subscriber from MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get subscriber'
      };
    }
  }

  async deleteSubscriber(subscriberId) {
    try {
      await this.api.delete(`/subscribers/${subscriberId}`);
      
      return {
        success: true,
        message: 'Subscriber deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting subscriber from MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete subscriber'
      };
    }
  }

  // Group Management
  async createGroup(name, type = 'regular') {
    try {
      const payload = { name, type };
      const response = await this.api.post('/groups', payload);
      
      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: 'Group created successfully'
        };
      }
    } catch (error) {
      console.error('Error creating group in MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create group'
      };
    }
  }

  async getGroups() {
    try {
      const response = await this.api.get('/groups');
      
      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: 'Groups retrieved successfully'
        };
      }
    } catch (error) {
      console.error('Error getting groups from MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get groups'
      };
    }
  }

  async addSubscriberToGroup(groupId, subscriberId) {
    try {
      const response = await this.api.post(`/groups/${groupId}/subscribers/${subscriberId}`);
      
      return {
        success: true,
        message: 'Subscriber added to group successfully'
      };
    } catch (error) {
      console.error('Error adding subscriber to group in MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add subscriber to group'
      };
    }
  }

  async removeSubscriberFromGroup(groupId, subscriberId) {
    try {
      await this.api.delete(`/groups/${groupId}/subscribers/${subscriberId}`);
      
      return {
        success: true,
        message: 'Subscriber removed from group successfully'
      };
    } catch (error) {
      console.error('Error removing subscriber from group in MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove subscriber from group'
      };
    }
  }

  // Campaign Management
  async createCampaign(name, subject, type = 'regular') {
    try {
      const payload = {
        name,
        type,
        settings: {
          subject
        }
      };

      const response = await this.api.post('/campaigns', payload);
      
      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: 'Campaign created successfully'
        };
      }
    } catch (error) {
      console.error('Error creating campaign in MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create campaign'
      };
    }
  }

  async getCampaigns(filter = 'all') {
    try {
      const response = await this.api.get(`/campaigns?filter=${filter}`);
      
      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: 'Campaigns retrieved successfully'
        };
      }
    } catch (error) {
      console.error('Error getting campaigns from MailerLite:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get campaigns'
      };
    }
  }

  // Utility Methods
  async subscribeToNewsletter(email, name = '', company = '') {
    // This is a convenience method for newsletter subscription
    const fields = {
      name,
      company,
      source: 'OpScore Pro Assessment Tool',
      subscription_date: new Date().toISOString()
    };

    return await this.addSubscriber(email, fields);
  }

  async subscribeAssessmentCompleter(email, name = '', assessmentScore = null) {
    // Special method for users who complete assessments
    const fields = {
      name,
      source: 'OpScore Pro Assessment Completion',
      last_assessment_date: new Date().toISOString(),
      assessment_score: assessmentScore ? assessmentScore.toString() : ''
    };

    // Try to find or create an "Assessment Completers" group
    const groupsResponse = await this.getGroups();
    let assessmentGroup = null;
    
    if (groupsResponse.success) {
      assessmentGroup = groupsResponse.data.find(group => 
        group.name === 'Assessment Completers'
      );
    }

    const groups = assessmentGroup ? [assessmentGroup.id] : [];
    return await this.addSubscriber(email, fields, groups);
  }

  // Health check method
  async testConnection() {
    try {
      const response = await this.api.get('/me');
      
      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: 'MailerLite connection successful'
        };
      }
    } catch (error) {
      console.error('MailerLite connection test failed:', error.response?.data?.message || error.message);
      return {
        success: false,
        message: 'MailerLite connection failed'
      };
    }
  }
}

export const mailerLiteService = new MailerLiteService();