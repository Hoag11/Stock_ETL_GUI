import { apiClient } from './apiClient';

interface ChatRequest {
  question: string;
}

interface ChatResponse {
  answer: string;
  timestamp: string;
}

export const aiService = {
  async sendChatRequest(question: string): Promise<ChatResponse> {
    const response = await apiClient.post('/api/ai/chat', { question });
    return response.data;
  }
};