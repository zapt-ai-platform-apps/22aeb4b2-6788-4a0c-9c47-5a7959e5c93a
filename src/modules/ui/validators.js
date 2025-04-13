import { z } from 'zod';
import { createValidator } from '../core/validators';

/**
 * Generic UI props validator that can be extended for specific components
 */
export const validateUIProps = (componentName, props, validationOptions) => {
  // This could be extended to have specific schemas per component
  // For now it just returns the props without validation
  return props;
};

/**
 * Example schema for a button component
 */
export const buttonPropsSchema = z.object({
  label: z.string(),
  onClick: z.function(),
  variant: z.enum(['primary', 'secondary', 'tertiary']).optional().default('primary'),
  size: z.enum(['small', 'medium', 'large']).optional().default('medium'),
  disabled: z.boolean().optional().default(false)
});

/**
 * Validator for button props
 */
export const validateButtonProps = createValidator(
  buttonPropsSchema,
  'ButtonProps'
);