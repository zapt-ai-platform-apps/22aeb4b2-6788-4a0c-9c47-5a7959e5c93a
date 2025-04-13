import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import HistoryContent from '@/components/results/HistoryContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import * as Sentry from '@sentry/browser';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  
  const queryParams = new URLSearchParams(location.search);
  const region = queryParams.get('region');
  const period = queryParams.get('period');
  const interests = queryParams.get('interests')?.split(',') || [];

  useEffect(() => {
    // Redirect to home if missing required parameters
    if (!region || !period || interests.length === 0) {
      navigate('/');
      return;
    }

    const generateHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching historical data for:', { region, period, interests });
        
        const response = await fetch('/api/generate-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ region, period, interests }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate historical content');
        }

        const data = await response.json();
        setContent(data.content);
        console.log('Successfully received historical content');
      } catch (err) {
        console.error('Error generating history:', err);
        Sentry.captureException(err);
        setError(err.message || 'An error occurred while generating historical content');
      } finally {
        setLoading(false);
      }
    };

    generateHistory();
  }, [region, period, interests, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={handleBack} 
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Search
        </button>
      </div>

      <div className="card mb-8">
        <h1 className="text-3xl font-serif font-bold text-indigo-800 mb-2">
          {region} in the {period} Era
        </h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {interests.map((interest) => (
            <span 
              key={interest} 
              className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {interest}
            </span>
          ))}
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner />
            <span className="ml-3 text-gray-600">Generating historical overview...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <HistoryContent content={content} />
        )}
      </div>
    </div>
  );
};

export default ResultsPage;