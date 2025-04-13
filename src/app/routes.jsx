import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ui } from '@/modules/index';

// Lazy load page components
const HomePage = lazy(() => import('@/modules/features/home/HomePage'));
const ResultsPage = lazy(() => import('@/modules/features/results/ResultsPage'));

const LoadingSpinner = ui.LoadingSpinner;

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex justify-center items-center h-64">
    <LoadingSpinner />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;