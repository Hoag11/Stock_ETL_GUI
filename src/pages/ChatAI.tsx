import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BarChart2, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  includesChart?: boolean;
}

const ChatAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m your AI analytics assistant. How can I help you analyze your data today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample questions
  const sampleQuestions = [
    "What were our top-selling products last month?",
    "Show me the sales trend for Q1 2025",
    "Compare customer retention rates between regions",
    "What's our year-over-year growth in the European market?",
    "Analyze our marketing campaign ROI from last quarter"
  ];
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateBotResponse(input),
        timestamp: new Date(),
        includesChart: Math.random() > 0.5, // Randomly include a chart
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Simple bot response generator
  const generateBotResponse = (userInput: string): string => {
    userInput = userInput.toLowerCase();
    
    if (userInput.includes('sales') || userInput.includes('revenue')) {
      return "Based on our sales data analysis, we've seen a 12% increase in overall revenue compared to the same period last year. The highest performing product category was electronics with a 24% growth rate. Would you like me to create a detailed sales breakdown report?";
    }
    
    if (userInput.includes('customer') || userInput.includes('retention')) {
      return "Our customer retention analysis shows an 86% retention rate across all segments. Premium customers have the highest retention at 94%. The main factors contributing to churn appear to be price sensitivity and competitive offerings. I'd recommend focusing on our mid-tier customer segment where we can improve retention by approximately 8%.";
    }
    
    if (userInput.includes('marketing') || userInput.includes('campaign')) {
      return "I've analyzed your marketing campaign performance. The digital channels are showing the best ROI at 3.2x, while traditional media is at 1.8x. Based on attribution modeling, email campaigns contributed to 28% of conversions. Would you like recommendations for optimizing your marketing mix?";
    }
    
    if (userInput.includes('trend') || userInput.includes('forecast')) {
      return "Looking at the trend data, I'm projecting a 15-18% growth in the next quarter. This forecast is based on seasonal patterns, current momentum, and market conditions. There's a 85% confidence interval for this prediction. I can prepare a detailed forecast report with different scenarios if you'd like.";
    }
    
    if (userInput.includes('compare')) {
      return "I've compared the performance metrics across different dimensions. The standout finding is that our West region is outperforming other regions by 23% in conversion rate and 17% in average order value. This appears to be correlated with the new merchandising strategy implemented there. Should we consider rolling this strategy out to other regions?";
    }
    
    return "I've analyzed your question and gathered some insights from your business data. There are several interesting patterns worth noting. Would you like me to prepare a more detailed report on this topic or visualize any specific aspects of the data?";
  };
  
  return (
    <div className="animate-fade-in h-[calc(100vh-9rem)]">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">AI Analytics Assistant</h1>
          <p className="text-gray-600">Ask questions about your data and get AI-powered insights</p>
        </div>
        
        {/* Chat container */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[80%] rounded-lg p-3 
                      ${message.type === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1 rounded-full bg-white/10">
                        {message.type === 'user' 
                          ? <User size={14} /> 
                          : <Bot size={14} />
                        }
                      </div>
                      <span className="text-xs opacity-75">
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <p>{message.text}</p>
                    
                    {/* Render chart if included */}
                    {message.type === 'bot' && message.includesChart && (
                      <div className="mt-3 bg-white rounded-md p-2 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-700">Generated Data Visualization</span>
                          <BarChart2 size={14} className="text-blue-500" />
                        </div>
                        <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
                          <p className="text-sm text-gray-500">
                            [Power BI Visualization Would Appear Here]
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-right mt-1">
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-white/10">
                        <Bot size={14} />
                      </div>
                      <span className="text-xs opacity-75">AI Assistant</span>
                    </div>
                    <div className="flex space-x-1 mt-2 items-center h-6">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Suggested questions */}
          <div className="px-4 py-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your business data..."
                className="input flex-1"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`ml-2 p-2 rounded-full ${
                  !input.trim() || isTyping
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Helper text */}
        <div className="mt-4 text-xs text-gray-500 flex items-center justify-center">
          <RefreshCw size={12} className="mr-1" />
          <span>AI responses are simulated for demo purposes. In a production environment, these would be powered by actual data analysis.</span>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;