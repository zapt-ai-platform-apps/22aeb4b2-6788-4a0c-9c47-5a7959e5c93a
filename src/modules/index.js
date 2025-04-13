/**
 * Root module exports - the only place where module APIs are exposed
 * This prevents direct imports from module internals
 */

// Core modules
import { api as coreApi } from './core/api';

// Feature modules
import { api as historyApi } from './history/api';

// UI/Presentation modules
import { api as layoutApi } from './layout/api';
import { api as uiApi } from './ui/api';

// Export all module APIs through this single interface
export const core = coreApi;
export const history = historyApi;
export const layout = layoutApi;
export const ui = uiApi;

/**
 * Initialize all modules - should be called at application startup
 */
export async function initializeModules() {
  // No initialization needed for now, but will be used when modules need setup
  console.log('Initializing application modules');
  return Promise.resolve();
}