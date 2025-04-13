import { eventBus } from './events';
import { createValidator } from './validators';

/**
 * Core module public API
 */
export const api = {
  events: eventBus,
  createValidator
};