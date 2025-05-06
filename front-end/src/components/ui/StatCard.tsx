import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isIncrease: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isIncrease, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-transform hover:scale-102">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium flex items-center ${
          isIncrease 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {isIncrease ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
          {change}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last period</span>
      </div>
    </div>
  );
};

export default StatCard;