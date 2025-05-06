import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface SalesChartProps {
  timeRange: 'day' | 'week' | 'month' | 'year';
  isAdvancedUser: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({ timeRange, isAdvancedUser }) => {
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
      
      // Generate random data for two datasets
      const data1 = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 50);
      const data2 = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 30);
      
      // Define labels based on time range
      let labels: string[] = [];
      
      switch(timeRange) {
        case 'day':
          labels = ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];
          break;
        case 'week':
          labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          break;
        case 'month':
          labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          break;
        case 'year':
          labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          break;
      }
      
      // Adjust data length to match labels
      const adjustedData1 = data1.slice(0, labels.length);
      const adjustedData2 = data2.slice(0, labels.length);
      
      // Find max value for scaling
      const maxData = Math.max(...adjustedData1, ...adjustedData2);
      
      // Draw background grid
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < 5; i++) {
        const y = height - (i * height / 4);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      
      // Vertical grid lines for labels
      for (let i = 0; i < labels.length; i++) {
        const x = (i / (labels.length - 1)) * width;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      
      ctx.stroke();
      
      // Draw x-axis labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      
      for (let i = 0; i < labels.length; i++) {
        const x = (i / (labels.length - 1)) * width;
        ctx.fillText(labels[i], x, height - 5);
      }
      
      // Draw dataset 1 (current period)
      if (!isAdvancedUser && timeRange === 'year') {
        // Draw blur overlay for limited data
        const gradient = ctx.createLinearGradient(width / 3, 0, width, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(width / 3, 0, width * 2/3, height);
        
        // Draw lock icon
        ctx.fillStyle = '#9ca3af';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔒 Upgrade for full data', width * 0.7, height / 2);
      } else {
        // Draw both datasets normally
        // Dataset 1
        ctx.beginPath();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        
        for (let i = 0; i < adjustedData1.length; i++) {
          const x = (i / (labels.length - 1)) * width;
          const y = height - 30 - (adjustedData1[i] / maxData) * (height - 60);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Draw area under line 1
        ctx.beginPath();
        ctx.moveTo(0, height - 30);
        
        for (let i = 0; i < adjustedData1.length; i++) {
          const x = (i / (labels.length - 1)) * width;
          const y = height - 30 - (adjustedData1[i] / maxData) * (height - 60);
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height - 30);
        ctx.closePath();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fill();
        
        // Dataset 2 (previous period)
        ctx.beginPath();
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]); // Dashed line for previous period
        
        for (let i = 0; i < adjustedData2.length; i++) {
          const x = (i / (labels.length - 1)) * width;
          const y = height - 30 - (adjustedData2[i] / maxData) * (height - 60);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash
      }
      
      // Draw legend
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      
      // Current period marker
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.moveTo(10, height - 15);
      ctx.lineTo(30, height - 15);
      ctx.stroke();
      ctx.fillText('Current Period', 35, height - 12);
      
      // Previous period marker
      ctx.beginPath();
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.moveTo(width / 2 + 10, height - 15);
      ctx.lineTo(width / 2 + 30, height - 15);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillText('Previous Period', width / 2 + 35, height - 12);
    }
  }, [loading, timeRange, isAdvancedUser]);
  
  return (
    <div className="h-80 w-full">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
          width={800}
          height={300}
        />
      )}
    </div>
  );
};

export default SalesChart;