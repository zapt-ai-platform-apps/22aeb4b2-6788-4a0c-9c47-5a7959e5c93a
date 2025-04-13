import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { history, ui } from '@/modules/index';
import * as Sentry from '@sentry/browser';

// Lazy load the content component
const HistoryContent = lazy(() => import('@/modules/history/ui/results/HistoryContent'));
const LoadingSpinner = ui.LoadingSpinner;

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

    const fetchHistoricalContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the public API of the history module
        const result = await history.generateHistoricalContent({
          region,
          period,
          interests
        });
        
        setContent(result.content);
      } catch (err) {
        console.error('Error generating history:', err);
        Sentry.captureException(err);
        setError(err.message || 'An error occurred while generating historical content');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalContent();
  }, [region, period, interests, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button 
          onClick={handleBack} 
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
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
          <Suspense fallback={<div className="flex justify-center p-8"><LoadingSpinner /></div>}>
            <HistoryContent content={content} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;