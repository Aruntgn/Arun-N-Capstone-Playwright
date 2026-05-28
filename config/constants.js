// =============================================================================
// config/constants.js
// OrangeHRM Framework — Central Constants & Configuration
// Single source of truth for all URLs, credentials, timeouts, and roles
// =============================================================================

// Application URLs — relative paths used with baseURL from playwright.config.js
export const URLS = {
  LOGIN: '/web/index.php/auth/login',
  DASHBOARD: '/web/index.php/dashboard/index',
  PIM: '/web/index.php/pim/viewEmployeeList',
  LEAVE: '/web/index.php/leave/viewLeaveList',
  RECRUITMENT: '/web/index.php/recruitment/viewCandidates',
  ADMIN: '/web/index.php/admin/viewSystemUsers',
  SEARCH: '/web/index.php/pim/viewEmployeeList',
};

// User Roles
export const ROLES = {
  ADMIN: 'Admin',
  ESS: 'ESS',
};

// Timeouts (milliseconds)
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
  PAGE_LOAD: 60000,
};

// UI Messages
export const MESSAGES = {
  LOGIN_ERROR: 'Invalid credentials',
  REQUIRED_FIELD: 'Required',
  SUCCESS_SAVE: 'Successfully Saved',
  SUCCESS_UPDATE: 'Successfully Updated',
  SUCCESS_DELETE: 'Successfully Deleted',
};

// Viewport sizes for responsive testing (M8)
export const VIEWPORTS = {
  DESKTOP: { width: 1280, height: 720 },
  TABLET: { width: 768, height: 1024 },
  MOBILE: { width: 375, height: 812 },
};