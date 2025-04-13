import { z } from 'zod';
import { createValidator } from '../core/validators';

/**
 * Schema for layout configuration
 */
export const layoutConfigSchema = z.object({
  showHeader: z.boolean().optional().default(true),
  showFooter: z.boolean().optional().default(true),
  containerWidth: z.string().optional().default('max-w-5xl')
}).optional().default({});

/**
 * Validator for layout configuration
 */
export const validateLayoutConfig = createValidator(
  layoutConfigSchema,
  'LayoutConfig'
);