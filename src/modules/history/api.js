import { validateHistorySearchParams, validateHistoryResults } from './validators';
import { generateHistoricalContent } from './internal/services';
import { events } from './events';

// Constants
import { interestOptions } from './constants/interestOptions';
import { timePeriods } from './constants/timePeriods';

/**
 * History module public API
 * This is the only way other modules should interact with the history module
 */
export const api = {
  // Public services
  generateHistoricalContent: async (params) => {
    // Validate incoming parameters at the module boundary
    const validatedParams = validateHistorySearchParams(params, {
      actionName: 'generateHistoricalContent',
      location: 'history/api.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'history'
    });
    
    // Call internal implementation
    const result = await generateHistoricalContent(validatedParams);
    
    // Validate outgoing result at the module boundary
    return validateHistoryResults(result, {
      actionName: 'generateHistoricalContent',
      location: 'history/api.js',
      direction: 'outgoing',
      moduleFrom: 'history',
      moduleTo: 'client'
    });
  },
  
  // Public constants
  interestOptions,
  timePeriods,
  
  // Public events
  events,
  
  // Public UI components
  HistoryForm: () => import('./ui/form/HistoryForm').then(m => m.default),
  HistoryContent: () => import('./ui/results/HistoryContent').then(m => m.default)
};