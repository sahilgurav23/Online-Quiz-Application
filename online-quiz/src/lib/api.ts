// API Client for Quiz API with API Key Authentication
import { QuizDto } from '@/types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5079/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=';

class QuizApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string = API_BASE_URL, apiKey: string = API_KEY) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Get common headers including API Key authentication
   */
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
    };
  }

  /**
   * Handle API errors with detailed messages
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or missing API key');
      }
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      
      // Try to parse error message from response
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
      } catch {
        throw new Error(`API Error: ${response.statusText}`);
      }
    }

    return response.json();
  }

  /**
   * Fetch all quizzes (without correct answers)
   * Endpoint: GET /api/quizzes
   */
  async getAllQuizzes(): Promise<QuizDto[]> {
    const response = await fetch(`${this.baseUrl}/quizzes`, {
      method: 'GET',
      headers: this.getHeaders(),
      cache: 'no-store', // Always fetch fresh data
    });

    return this.handleResponse<QuizDto[]>(response);
  }

  /**
   * Fetch a specific quiz by ID (without correct answers)
   * Endpoint: GET /api/quizzes/{id}
   */
  async getQuizById(id: number): Promise<QuizDto> {
    const response = await fetch(`${this.baseUrl}/quizzes/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
      cache: 'no-store',
    });

    return this.handleResponse<QuizDto>(response);
  }

  /**
   * Fetch a specific quiz with correct answers revealed
   * Endpoint: GET /api/quizzes/{id}/answers
   */
  async getQuizWithAnswers(id: number): Promise<QuizDto> {
    const response = await fetch(`${this.baseUrl}/quizzes/${id}/answers`, {
      method: 'GET',
      headers: this.getHeaders(),
      cache: 'no-store',
    });

    return this.handleResponse<QuizDto>(response);
  }
}

// Export singleton instance
export const quizApi = new QuizApiClient();
