import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const isAdvancedUser = user?.role === 'ADVANCED_USER' || user?.role === 'ADMIN';

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add initial greeting
  useEffect(() => {
    setMessages([
      {
        id: '0',
        text: `Hello ${user?.username}! I'm your AI assistant. How can I help you analyze your data today?`,
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  }, [user?.username]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await aiService.sendChatRequest(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ask questions about your data and get AI-powered insights
        </p>
      </div>
      
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3/4 md:max-w-2/3 rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.sender === 'ai' ? (
                    <Bot className="h-4 w-4 mr-1" />
                  ) : (
                    <UserIcon className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.sender === 'ai' ? 'AI Assistant' : 'You'}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="mb-4 flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-200">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-1" />
                  <span className="text-xs opacity-70 mr-2">AI Assistant</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {!isAdvancedUser && (
            <div className="mb-2 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 p-2 rounded">
              Basic users have limited queries per day. <a href="/upgrade" className="underline font-medium">Upgrade</a> for unlimited access.
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something about your data..."
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`px-4 py-2 rounded-r-md ${
                loading || !input.trim()
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors duration-200`}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChat;