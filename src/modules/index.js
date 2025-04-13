import { api as coreApi } from './core/api';
import { api as historyApi } from './history/api';
import { api as layoutApi } from './layout/api';
import { api as uiApi } from './ui/api';

/**
 * Export all module APIs to make them accessible to the application
 */
export const core = coreApi;
export const history = historyApi;
export const layout = layoutApi;
export const ui = uiApi;