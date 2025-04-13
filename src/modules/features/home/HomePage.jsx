import React, { Suspense, lazy } from 'react';
import { history, ui } from '@/modules/index';

// Lazy load the form component
const HistoryForm = lazy(() => import('@/modules/history/ui/form/HistoryForm'));
const LoadingSpinner = ui.LoadingSpinner;

const HomePage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-indigo-800 mb-4">
          Explore Historical Eras
        </h1>
        <p className="text-lg text-gray-600">
          Discover the cultural, scientific, and artistic achievements of any time period and region
        </p>
      </div>
      
      <div className="card">
        <Suspense fallback={<div className="flex justify-center p-8"><LoadingSpinner /></div>}>
          <HistoryForm />
        </Suspense>
      </div>
      
      <div className="mt-8 bg-indigo-50 rounded-lg p-6 shadow-inner">
        <h2 className="text-xl font-serif font-semibold text-indigo-800 mb-4">
          How It Works
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><span className="font-medium">Enter a region or country</span> you're interested in exploring</li>
          <li><span className="font-medium">Select a time period</span> to focus your historical inquiry</li>
          <li><span className="font-medium">Choose areas of interest</span> like art, science, or literature</li>
          <li><span className="font-medium">Receive a comprehensive overview</span> of that era's achievements</li>
        </ol>
      </div>
    </div>
  );
};

export default HomePage;