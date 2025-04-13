import { validateUIProps } from './validators';
import LoadingSpinner from './components/LoadingSpinner';

/**
 * UI module public API
 * Provides shared UI components and utilities
 */
export const api = {
  // Public UI components
  LoadingSpinner,
  
  // Example method showing how validation would work
  validateComponentProps: (componentName, props) => {
    return validateUIProps(componentName, props, {
      actionName: 'validateComponentProps',
      location: 'ui/api.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'ui'
    });
  }
};