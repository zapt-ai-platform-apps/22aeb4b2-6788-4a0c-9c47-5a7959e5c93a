import * as Sentry from '@sentry/browser';
import { eventBus } from '../../core/events';
import { events } from '../events';
import { validateHistorySearchParams, validateHistoryResults } from '../validators';

/**
 * Fetch historical content from the API
 */
export const generateHistoricalContent = async (searchParams) => {
  try {
    // Validate the input parameters
    const validatedParams = validateHistorySearchParams(searchParams, {
      actionName: 'generateHistoricalContent',
      location: 'history/internal/services.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'history'
    });
    
    console.log('Fetching historical data for:', validatedParams);
    
    // Publish search initiated event
    eventBus.publish(events.HISTORY_SEARCH_INITIATED, validatedParams);
    
    // Make API request
    const response = await fetch('/api/generate-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedParams),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate historical content');
    }

    const data = await response.json();
    
    // Validate the response data
    const validatedResults = validateHistoryResults(data, {
      actionName: 'generateHistoricalContent',
      location: 'history/internal/services.js',
      direction: 'outgoing',
      moduleFrom: 'history',
      moduleTo: 'client'
    });
    
    console.log('Successfully received historical content');
    
    // Publish results received event
    eventBus.publish(events.HISTORY_RESULTS_RECEIVED, validatedResults);
    
    return validatedResults;
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