import * as Sentry from '@sentry/browser';
import { eventBus } from '../../core/events';
import { events } from '../events';

/**
 * Internal service for fetching historical content from the API
 * Not exported directly - should only be called through the public API
 */
export const generateHistoricalContent = async (params) => {
  try {
    // Parameters are already validated at the public API boundary
    console.log('Fetching historical data for:', params);
    
    // Publish search initiated event
    eventBus.publish(events.HISTORY_SEARCH_INITIATED, params);
    
    // Make API request
    const response = await fetch('/api/generate-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate historical content');
    }

    const data = await response.json();
    
    console.log('Successfully received historical content');
    
    // Publish results received event
    eventBus.publish(events.HISTORY_RESULTS_RECEIVED, data);
    
    return data;
  } catch (error) {
    console.error('Error generating history:', error);
    Sentry.captureException(error);
    
    // Publish error event
    eventBus.publish(events.HISTORY_ERROR_OCCURRED, { 
      message: error.message || 'An error occurred while generating historical content' 
    });
    
    throw error;
  }
};