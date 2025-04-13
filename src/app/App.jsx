import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { layout, initializeModules } from '@/modules/index';

const App = () => {
  const { Layout } = layout;

  useEffect(() => {
    // Initialize all modules when the app starts
    initializeModules().catch(error => {
      console.error('Failed to initialize modules:', error);
    });
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;