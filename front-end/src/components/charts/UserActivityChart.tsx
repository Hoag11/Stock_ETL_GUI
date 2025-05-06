import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface UserActivityChartProps {
  timeRange: 'day' | 'week' | 'month' | 'year';
}

const UserActivityChart: React.FC<UserActivityChartProps> = ({ timeRange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    
    return () => clearTimeout(timer);
  }, [timeRange]);
  
  useEffect(() => {
    if (!loading && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Set dimensions
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      // Generate random data
      const data = Array.from({ length: 24 }, () => Math.floor(Math.random() * 50) + 10);
      
      // Find max value for scaling
      const maxData = Math.max(...data);
      
      // Draw background grid
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < 5; i++) {
        const y = height - (i * height / 4);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      
      // Draw data points and line
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      
      for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / maxData) * (height - 20);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw points
      for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / maxData) * (height - 20);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
      }
      
      // Fill area under the line
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height - (data[i] / maxData) * (height - 20);
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fill();
    }
  }, [loading]);
  
  return (
    <div className="h-48 w-full">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
          width={300}
          height={150}
        />
      )}
    </div>
  );
};

export default UserActivityChart;