// =============================================================================
// fixtures/index.js
// OrangeHRM Framework — Custom Playwright Fixtures
// Extends base test with reusable setup — replaces beforeEach boilerplate
// =============================================================================

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

export const test = base.extend({

  // Provides a LoginPage instance to any test that requests it
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Provides authenticated DashboardPage — login handled automatically
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.loginAndWaitForDashboard(
      process.env.ADMIN_USERNAME || 'Admin',
      process.env.ADMIN_PASSWORD || 'admin123'
    );
    // Wait for dashboard to fully settle across all browsers
    await page.waitForURL('**/dashboard/**', { timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

});

export { expect } from '@playwright/test';