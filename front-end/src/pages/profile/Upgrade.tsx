import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, CreditCard, Loader2 } from 'lucide-react';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

const Upgrade: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const handleUpgrade = async () => {
    setLoading(true);
    setError('');
    
    try {
      const updatedUser = await userService.upgradeAccount();
      await updateUser(updatedUser);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upgrade account. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upgrade to Advanced</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Get access to premium features and enhanced analytics
        </p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic</h2>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-medium">
                Current Plan
              </span>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">Free</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Basic analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Limited AI chat queries (10/day)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Standard data visualizations</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Email support</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow overflow-hidden text-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Zap className="h-5 w-5 mr-1" />
                Advanced
              </h2>
              <span className="px-2 py-1 bg-blue-500 bg-opacity-30 rounded text-xs font-medium">
                Recommended
              </span>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">$19</span>
              <span className="text-blue-200">/month</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-blue-100">Everything in Basic, plus:</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-blue-100">Advanced analytics with historical data</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-blue-100">Unlimited AI chat queries</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-blue-100">Advanced data visualizations</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-blue-100">Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-blue-100">Data export capabilities</span>
              </li>
            </ul>
            
            <button
              onClick={handleUpgrade}
              disabled={loading || user?.role === 'ADVANCED_USER' || user?.role === 'ADMIN'}
              className={`w-full py-2 px-4 rounded-md bg-white text-blue-700 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center ${
                loading || user?.role === 'ADVANCED_USER' || user?.role === 'ADMIN' 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Processing...
                </span>
              ) : user?.role === 'ADVANCED_USER' || user?.role === 'ADMIN' ? (
                'Current Plan'
              ) : (
                <span className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade Now
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              How does billing work?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              You'll be billed monthly on the date you upgrade. You can cancel anytime from your account settings.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              Can I change plans later?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We accept all major credit cards, including Visa, Mastercard, and American Express.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              Is there a free trial?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We offer a 14-day free trial for our Advanced plan. No credit card required to start.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;