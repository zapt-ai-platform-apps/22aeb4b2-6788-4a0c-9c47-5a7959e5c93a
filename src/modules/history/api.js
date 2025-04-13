import { generateHistoricalContent } from './internal/services';
import { events } from './events';
import { interestOptions } from './constants/interestOptions';
import { timePeriods } from './constants/timePeriods';

/**
 * History module public API
 */
export const api = {
  // Services
  generateHistoricalContent,
  
  // Constants
  interestOptions,
  timePeriods,
  
  // Events
  events
};