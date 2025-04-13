import { z } from 'zod';
import { createValidator } from '../core/validators';

/**
 * Schema for history search parameters
 */
export const historySearchParamsSchema = z.object({
  region: z.string().min(1, "Region is required"),
  period: z.string().min(1, "Time period is required"),
  interests: z.array(z.string()).min(1, "At least one interest is required")
});

/**
 * Schema for history search results
 */
export const historyResultSchema = z.object({
  content: z.string().optional()
});

/**
 * Validator for history search parameters
 */
export const validateHistorySearchParams = createValidator(
  historySearchParamsSchema,
  'HistorySearchParams'
);

/**
 * Validator for history search results
 */
export const validateHistoryResults = createValidator(
  historyResultSchema,
  'HistoryResults'
);