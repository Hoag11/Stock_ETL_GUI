import { apiClient } from './apiClient';

interface ChatRequest {
  message: string;  
}

interface ChatResponse {
  answer: string;
  timestamp: string;
}

export const aiService = {
  async sendChatRequest(question: string): Promise<ChatResponse> {
    const response = await apiClient.post('/api/ai/chat', { message: question });
    return response.data;
  }
};