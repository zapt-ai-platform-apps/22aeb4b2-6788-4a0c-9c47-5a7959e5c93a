import { validateLayoutConfig } from './validators';

// UI Components
import Header from './ui/Header';
import Footer from './ui/Footer';
import Layout from './ui/Layout';

/**
 * Layout module public API
 */
export const api = {
  // Public UI components
  Header,
  Footer,
  Layout,
  
  // Public methods
  configureLayout: (config) => {
    // Example of how we would validate config if needed
    return validateLayoutConfig(config, {
      actionName: 'configureLayout',
      location: 'layout/api.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'layout'
    });
  }
};